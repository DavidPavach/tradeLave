import { useState } from "react";
import { toast } from "react-fox-toast";

// Enums and Hooks
import { COINS, MINI_DEPOSIT_USD } from "@/enum";
import { useCreateDepositRequest } from "@/services/mutations.service";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Icons
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

export default function Form() {


  const [formData, setFormData] = useState({
    coin: "",
    amount: "",
    notes: "",
    agreed: false
  })

  // Functions
  const reset = () => {
    setFormData({
      coin: "",
      amount: "",
      notes: "",
      agreed: false,
    })
  }

  const createRequest = useCreateDepositRequest();
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    // Validate FormData
    if (!formData.coin || !formData.amount) return toast.error("Please fill in all required fields");
    if (!formData.agreed) return toast.error("Kindly agree to the terms to continue.")
    if (Number(formData.amount) < MINI_DEPOSIT_USD) return toast.error(`Minimum deposit amount is $${MINI_DEPOSIT_USD} USD`);

    // Create Bank Transfer Request Data
    const data: createRequest = { coin: formData.coin, amount: Number(formData.amount), notes: formData.notes.trim().length > 0 ? formData.notes : undefined };
    toast("Creating bank transfer request...")

    createRequest.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Your bank transfer request was created successfully!");
        reset();
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const message = error?.response?.data?.message || "Bank transfer request failed. Please try again.";
        toast.error(message);
        reset();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mx-auto mt-16 max-w-4xl">
      <section className="flex md:flex-row flex-col gap-y-5 md:gap-x-5">
        <div className="space-y-2 w-full md:w-1/2">
          <Label htmlFor="coin" className="font-semibold text-foreground">
            Select Cryptocurrency <span className="text-destructive">*</span>
          </Label>
          <Select disabled={createRequest.isPending} value={formData.coin} onValueChange={(value) => setFormData({ ...formData, coin: value })}>
            <SelectTrigger id="coin" className="py-2 w-full capitalize">
              <SelectValue placeholder="Choose a coin" />
            </SelectTrigger>
            <SelectContent className="border border-border">
              {COINS.map((coin) => (
                <SelectItem key={coin} value={coin} className="uppercase">
                  {coin}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full md:w-1/2">
          <Label htmlFor="amount" className="font-semibold text-foreground">
            Amount <span className="text-destructive">*</span>
          </Label>
          <Input disabled={createRequest.isPending} id="amount" type="number" step="0.0001" placeholder="Enter amount" className="w-full montserrat" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} min="0" />
        </div>
      </section>

      <div className="space-y-2">
        <Label htmlFor="notes" className="font-semibold text-foreground">
          Additional Notes (Optional)
        </Label>
        <Textarea disabled={createRequest.isPending} id="notes" placeholder="Add any additional information about your bank transfer request..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="p-2 md:p-3 xl:p-4 h-32 resize-none" />
      </div>

      <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
        <Checkbox id="toggle-2"
          onCheckedChange={(val) => setFormData({ ...formData, agreed: Boolean(val) })}
          className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white" />
        <div className="gap-1.5 grid font-normal">
          <p className="font-medium text-[11px] md:text-xs xl:text-sm leading-none">
            Agree to Terms
          </p>
          <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
            By submitting this request you authorize us to connect you with a vendor to facilitate your purchase. Once the transaction is completed, the resulting balance will be automatically deposited in your account
          </p>
        </div>
      </Label>

      <Button type="submit" disabled={createRequest.isPending} className="py-3 w-full">
        {createRequest.isPending ? <span className="flex items-center gap-x-1"><Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> Creating Request...</span> : "Create Request"}
      </Button>
    </form>
  )
}

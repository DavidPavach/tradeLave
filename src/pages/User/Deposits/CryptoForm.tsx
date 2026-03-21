import { useState } from "react";
import { toast } from "react-fox-toast";

// Enums, Hooks and Types
import { COINS, MINI_DEPOSIT_USD } from "@/enum";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Icons
import { Loader } from "lucide-react";
import CryptoPayment from "./CryptoPayment";

export default function CryptoForm() {

  const [pay, setPay] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    coin: "",
    amount: "",
    agreed: false
  })

  // Functions
  const togglePay = () => setPay((prev) => !prev);

  const reset = () => {
    setFormData({
      coin: "",
      amount: "",
      agreed: false,
    })
    setProcessing(false);
  }


  const handleSubmit = async (e: React.FormEvent) => {

    toast.info("Validating Transaction...")
    e.preventDefault();
    setProcessing(true);

    // Validate FormData
    if (!formData.coin || !formData.amount) return toast.error("Please fill in all required fields");
    if (!formData.agreed) return toast.error("Kindly agree to the terms to continue.")
    if (Number(formData.amount) < MINI_DEPOSIT_USD) return toast.error(`Minimum deposit amount is $${MINI_DEPOSIT_USD} USD`);

    setTimeout(() => {
      toast.info("Redirected to payment page...");
      togglePay();
    }, 3000)
  }

  return (
    <>
      {pay ?
        <CryptoPayment coin={formData.coin} amount={Number(formData.amount)} closeModal={togglePay} reset={reset} />
        :
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto mt-16 max-w-4xl">
          <section className="flex flex-col gap-y-5">
            <div className="space-y-2">
              <Label htmlFor="coin" className="font-semibold text-foreground">
                Select Cryptocurrency <span className="text-destructive">*</span>
              </Label>
              <Select disabled={processing} value={formData.coin} onValueChange={(value) => setFormData({ ...formData, coin: value })}>
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

            <div className="space-y-2">
              <Label htmlFor="amount" className="font-semibold text-foreground">
                Amount <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                <span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2">$</span>

                <Input disabled={processing} id="amount" type="number" step="0.0001"
                  placeholder="Enter amount" className="pl-8 w-full montserrat" value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })} min="0" />
              </div>

              <p className="text-[11px] text-yellow-600 dark:text-yellow-400 md:text-xs xl:text-sm">
                Minimum deposit:{" "}
                <span className="montserrat">${MINI_DEPOSIT_USD} USD</span>
              </p>
            </div>
          </section>

          <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
            <Checkbox id="toggle-2"
              onCheckedChange={(val) => setFormData({ ...formData, agreed: Boolean(val) })}
              className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white" />
            <div className="gap-1.5 grid font-normal">
              <p className="font-medium text-[11px] md:text-xs xl:text-sm leading-none">
                Agree to Terms
              </p>
              <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                By submitting this request you agree to make the required payment and to provide the transaction hash (or any other requested details); once the transaction is confirmed and approved, the resulting balance will be automatically deposited into your account.
              </p>
            </div>
          </Label>

          <Button type="submit" disabled={processing} className="py-3 w-full">
            {processing ? <span className="flex items-center gap-x-1"><Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> Creating Deposit...</span> : "Create Deposit"}
          </Button>
          <p className="my-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm">Your deposit information is secure and encrypted. You'll be able to add transaction hash details after creation.</p>
        </form>
      }
    </>
  )
}

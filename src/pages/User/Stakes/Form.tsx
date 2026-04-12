import { useState } from "react";
import { Route } from "@/routes/_dashboard/stakes";
import { toast } from "react-fox-toast";

// Hooks and Enums
import { useNewInvestment } from "@/services/mutations.service";
import { useCoinDetails } from "@/Hooks/usePrices";
import { COINS } from "@/enum";

// Components
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { Loader } from "lucide-react";
import { formatCurrency } from "@/utils/format";


const Form = ({ plans }: { plans: Plans[] }) => {

    const search = Route.useSearch();
    const plan = search.plan;

    const findPlan = (name: string | undefined): Plans | undefined => {
        if (name === undefined) return undefined;
        return plans.find(
            (plan) => plan.title.toLowerCase() === name.toLowerCase()
        );
    }

    const [selectedPlan, setSelectedPlan] = useState<Plans | undefined>(findPlan(plan));
    const [amount, setAmount] = useState("");
    const [coin, setCoin] = useState<TransactionCoin | undefined>()
    const { getCoinDetails } = useCoinDetails();
    const meta = getCoinDetails(coin ?? "bitcoin");

    // Functions
    const reset = () => {
        setAmount("");
        setSelectedPlan(undefined);
        setCoin(undefined);
        setCoin(undefined);
    }

    const newInvestment = useNewInvestment()
    const handleSubmit = () => {

        // Minimal Validation
        if (!selectedPlan || !amount.trim() || !coin) return toast.error("Stake details incomplete !!!");
        if (selectedPlan.minValue > parseFloat(amount)) return toast.warning(`The entered amount is less than ${formatCurrency(selectedPlan.minValue)}`);
        if (selectedPlan.maxValue < parseFloat(amount)) return toast.warning(`The entered amount is less than ${formatCurrency(selectedPlan.maxValue)}`);

        // Check coin balance
        if (meta.usdEquiv < parseFloat(amount)) return toast.error(`You can't stake amount higher than your ${meta.name.toUpperCase()} balance.`)

        const formData = { 
            coin: coin as TransactionCoin, 
            plan: selectedPlan._id, 
            amount: parseFloat(amount),
            rate: meta.price,
        };
        newInvestment.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.message || "Your stake was initiated successfully!");
                reset();
            },

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Bank stake initialization failed. Please try again.";
                toast.error(message);
                reset();
            },
        });
    }

    return (
        <main className="bg-card shadow-sm mx-auto mt-10 p-6 border border-border rounded-xl max-w-4xl">
            <h2 className="mb-2 font-semibold text-foreground text-xl">
                Stake Your Cryptocurrencies
            </h2>
            <p className="mb-6 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                Select a strategy and enter your desired amount you wish to stake
            </p>

            {/* Plan Selection */}
            <div className="mb-6">
                <label className="block mb-3 font-semibold text-foreground text-sm">
                    Choose a Strategy
                </label>

                <div className="gap-4 grid grid-cols-2 min-[500px]:grid-cols-3">
                    {plans.map((plan) => {
                        const isActive = selectedPlan?.title === plan.title;

                        return (
                            <button key={plan._id} type="button" onClick={() => setSelectedPlan(plan)}
                                className={`text-left rounded-lg cursor-pointer border p-4 transition ${isActive ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
                                    }`}>
                                <h3 className="font-medium text-foreground capitalize montserrat">
                                    {plan.title}
                                </h3>
                                <p className="mt-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                    Click to select this plan
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Coin Selection */}
            <div className="space-y-2">
                <Label htmlFor="coin" className="font-semibold text-foreground">
                    Select Cryptocurrency <span className="text-destructive">*</span>
                </Label>
                <Select disabled={newInvestment.isPending} value={coin} onValueChange={(value) => setCoin(value as TransactionCoin)}>
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

            {/* Amount Input */}
            <div className="my-6">
                <label className="block mb-2 font-medium text-[11px] text-foreground md:text-xs xl:text-sm">
                    Amount
                </label>
                <div className="relative">
                    <span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2">
                        $
                    </span>
                    <Input type="number" disabled={newInvestment.isPending} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="pl-8 montserrat" />
                </div>
                {selectedPlan !== undefined && <p className="mt-2 text-[11px] text-yellow-700 dark:text-yellow-500 md:text-xs xl:text-sm capitalize montserrat">Min: {formatCurrency(selectedPlan.minValue)} .... Max: {formatCurrency(selectedPlan.maxValue)} .... Your {meta.name} Balance {formatCurrency(meta.usdEquiv)} </p>}
            </div>

            {/* Submit */}
            <Button disabled={!selectedPlan || !amount || newInvestment.isPending} className="w-full h-8 md:h-10 xl:h-12 cursor-pointer" onClick={handleSubmit}>
                {newInvestment.isPending ? <span><Loader className="inline mr-0.5 mb-0.5 animate-spin" /> Staking</span> : <span>Stake</span>}
            </Button>
        </main>
    );
}

export default Form;

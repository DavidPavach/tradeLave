import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks
import { useNewTransaction } from "@/services/mutations.service";
import { useCoinDetails } from "@/Hooks/usePrices";

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Icons
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

// Coin configuration with network requirements
const COINS = [
    { name: "bitcoin", label: "Bitcoin", networks: [] },
    { name: "ethereum", label: "Ethereum", networks: [] },
    { name: "tether trc20", label: "Tether TRC20", networks: ["TRON"] },
    { name: "tether erc20", label: "Tether ERC20", networks: ["Ethereum"] },
    { name: "solana", label: "Solana", networks: [] },
    { name: "usd coin", label: "USD Coin", networks: ["Ethereum", "Solana", "Polygon", "Arbitrum"] },
    { name: "dogecoin", label: "Dogecoin", networks: [] },
    { name: "ripple", label: "Ripple (XRP)", networks: [] },
    { name: "shiba inu", label: "Shiba Inu", networks: ["Ethereum"] },
]

interface WithdrawalFormData {
    coin: string
    amount: string
    walletAddress: string
    network: string
}

export default function Form() {

    const { getCoinDetails } = useCoinDetails();
    const [formData, setFormData] = useState<WithdrawalFormData>({
        coin: "",
        amount: "",
        walletAddress: "",
        network: "",
    })

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
    const coinDetails = getCoinDetails(formData.coin);

    const selectedCoin = COINS.find((c) => c.name === formData.coin)
    const requiresNetwork = selectedCoin?.networks && selectedCoin.networks.length > 0

    const handleCoinChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            coin: value,
            network: "",
        }))
        setValidationErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors.coin
            return newErrors
        })
    }

    const handleInputChange = (field: keyof WithdrawalFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
        setValidationErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[field]
            return newErrors
        })
    }

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Basic required checks
        if (!formData.coin) {
            errors.coin = "Please select a cryptocurrency";
        }

        if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
            errors.amount = "Please enter a valid amount";
        }

        if (!formData.walletAddress?.trim()) {
            errors.walletAddress = "Please enter a wallet address";
        }

        if (requiresNetwork && !formData.network) {
            errors.network = "Please select a network";
        }

        // Balance Check (Only run if we have coinDetails and a valid amount)
        if (coinDetails && formData.amount) {
            const inputAmount = parseFloat(formData.amount);
            const coinPrice = parseFloat((coinDetails.price).toFixed(2));
            const requestedCoinAmount = inputAmount / coinPrice;

            if (coinDetails.userBalance < requestedCoinAmount) {
                errors.amount = `Amount exceeds available balance ${coinDetails.usdEquiv}.`;
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const reset = () => {
        setFormData({
            coin: "",
            amount: "",
            walletAddress: "",
            network: "",
        })
    }

    const newWithdrawal = useNewTransaction()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // The validateForm now handles the balance check too!
        if (!validateForm()) {
            return;
        }

        const inputAmount = parseFloat(formData.amount);
        const roundedPrice = parseFloat(coinDetails.price.toFixed(2));

        const submissionData = {
            ...formData,
            transactionType: "withdrawal" as TransactionType,
            coin: formData.coin as TransactionCoin,
            coinAmount: Number((inputAmount / roundedPrice).toFixed(2)),
            amount: inputAmount
        };

        newWithdrawal.mutate(submissionData, {
            onSuccess: (response) => {
                toast.success(response.message || "Success!");
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed. Try again.";
                toast.error(message);
            },
        });
    };


    return (
        <main>
            <div className="mx-auto mt-10 max-w-4xl">
                {/* Main Card */}
                <Card className="bg-inherit shadow-lg border-border">
                    <CardHeader className="border-border border-b">
                        <CardTitle className="text-sm md:text-base xl:text-lg">Withdrawal Details</CardTitle>
                        <CardDescription className="text-[11px] md:text-xs xl:text-sm">Select your cryptocurrency and enter your withdrawal details</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Coin Selection */}
                            <div className="space-y-2">
                                <label htmlFor="coin" className="block font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
                                    Select Cryptocurrency
                                </label>
                                <Select value={formData.coin} onValueChange={handleCoinChange}>
                                    <SelectTrigger id="coin" className={`border-border w-full ${validationErrors.coin ? "border-destructive" : ""}`}>
                                        <SelectValue placeholder="Choose a cryptocurrency..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COINS.map((coin) => (
                                            <SelectItem key={coin.name} value={coin.name}>
                                                {coin.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {validationErrors.coin && (
                                    <div className="flex items-center gap-2 text-[11px] text-destructive md:text-xs xl:text-sm montserrat">
                                        <AlertCircle className="size-4" />
                                        {validationErrors.coin}
                                    </div>
                                )}
                            </div>

                            {/* Amount Input */}
                            <div className="space-y-2">
                                <label htmlFor="amount" className="block font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
                                    Amount
                                </label>
                                <div className="relative">
                                    <Input id="amount" type="number" placeholder="0.00" value={formData.amount} onChange={(e) => handleInputChange("amount", e.target.value)}
                                        className={`border-border pr-12 montserrat ${validationErrors.amount ? "border-destructive" : ""}`} step="0.00000001" min="0" />
                                    {selectedCoin && (
                                        <span className="top-1/2 right-3 absolute font-medium text-muted-foreground text-sm -translate-y-1/2">
                                            {selectedCoin.label.split(" ")[0].toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                {validationErrors.amount && (
                                    <div className="flex items-center gap-2 text-[11px] text-destructive md:text-xs xl:text-sm montserrat">
                                        <AlertCircle className="size-4" />
                                        {validationErrors.amount}
                                    </div>
                                )}
                            </div>

                            {/* Network Selection (Conditional) */}
                            {requiresNetwork && (
                                <div className="space-y-2">
                                    <label htmlFor="network" className="block font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
                                        Network
                                    </label>
                                    <Select value={formData.network} onValueChange={(value) => handleInputChange("network", value)}>
                                        <SelectTrigger id="network" className={`border-border ${validationErrors.network ? "border-destructive" : ""}`}>
                                            <SelectValue placeholder="Select network..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectedCoin?.networks.map((network) => (
                                                <SelectItem key={network} value={network}>
                                                    {network}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {validationErrors.network && (
                                        <div className="flex items-center gap-2 text-[11px] text-destructive md:text-xs xl:text-sm">
                                            <AlertCircle className="size-4" />
                                            {validationErrors.network}
                                        </div>
                                    )}
                                    <p className="text-muted-foreground text-xs">
                                        This cryptocurrency is available on multiple networks. Make sure your wallet address matches the
                                        selected network.
                                    </p>
                                </div>
                            )}

                            {/* Wallet Address Input */}
                            <div className="space-y-2">
                                <label htmlFor="address" className="block font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
                                    Wallet Address
                                </label>
                                <Input id="address" type="text" placeholder="Enter your wallet address (e.g., 0x742d35Cc6634C0532925a3b844Bc9e7595f...)"
                                    value={formData.walletAddress} onChange={(e) => handleInputChange("walletAddress", e.target.value)}
                                    className={`border-border font-mono text-sm ${validationErrors.walletAddress ? "border-destructive" : ""}`}
                                />
                                {validationErrors.walletAddress && (
                                    <div className="flex items-center gap-2 text-[11px] text-destructive md:text-xs xl:text-sm">
                                        <AlertCircle className="size-4" />
                                        {validationErrors.walletAddress}
                                    </div>
                                )}
                                <p className="text-[10px] text-muted-foreground text-xs">
                                    Double-check your wallet address before submitting. Withdrawals cannot be reversed.
                                </p>
                            </div>

                            {/* Summary Section */}
                            {formData.coin && formData.amount && (
                                <div className="bg-muted/30 p-4 border border-border rounded-lg">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                            <span className="text-muted-foreground">Coin</span>
                                            <span className="font-medium text-foreground">{selectedCoin?.label}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] md:text-xs xl:text-sm montserrat">
                                            <span className="text-muted-foreground">Amount</span>
                                            <span className="font-medium text-foreground">
                                                {formData.amount} {selectedCoin?.label.split(" ")[0].toUpperCase()}
                                            </span>
                                        </div>
                                        {requiresNetwork && formData.network && (
                                            <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                                <span className="text-muted-foreground">Network</span>
                                                <span className="font-medium text-foreground">{formData.network}</span>
                                            </div>
                                        )}
                                        <div className="mt-2 pt-2 border-border border-t">
                                            <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                                <span className="text-muted-foreground">Destination</span>
                                                <span className="max-w-xs font-mono font-medium text-foreground text-xs truncate">
                                                    {formData.walletAddress || "Pending..."}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-6">
                                <Button type="submit" className="flex-1 gap-2 bg-primary hover:bg-primary/90 h-8 md:h-10 xl:h-12" size="lg" disabled={newWithdrawal.isPending || Object.keys(validationErrors).length > 0}>
                                    {newWithdrawal.isPending ? (
                                        <>
                                            <CheckCircle2 className="size-4" />
                                            Submitted Successfully
                                        </>
                                    ) : (
                                        <>
                                            Confirm Withdrawal
                                            <ArrowRight className="size-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Information Alert */}
                <div className="bg-muted/50 mt-6 p-4 border border-border rounded-lg">
                    <div className="flex gap-3">
                        <AlertCircle className="flex-shrink-0 mt-0.5 size-5 text-yellow-700 dark:text-yellow-500" />
                        <div className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                            <p className="mb-1 font-medium">Important:</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Withdrawals are processed within 1-5 business days</li>
                                <li>Ensure your wallet address is correct before submitting</li>
                                <li>Network fees may apply depending on the selected cryptocurrency</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

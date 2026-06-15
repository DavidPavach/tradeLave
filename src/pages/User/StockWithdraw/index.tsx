import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks, Services, Utils
import { usePortfolioBalances } from "@/Hooks/useStockCoins";
import { useNewStockWithdrawal } from "@/services/mutations.service";
import { formatCurrency } from "@/utils/format";
import { useSettings } from "@/services/queries.service";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icons
import { Bitcoin, Danger, Ethereum, Tether } from "iconsax-reactjs";
import { CircleCheckBig, Loader } from "lucide-react";

const Index = () => {

    const { data } = useSettings();
    const { getAllCoinBalances } = usePortfolioBalances();

    const settings: Settings = data?.data || { noWithdrawal: false };
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [selectedCoin, setSelectedCoin] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    // Constants
    const allCoinDetails = getAllCoinBalances();
    const coinDetails = allCoinDetails.find(c => c.id === selectedCoin);
    const passMinimum = parseInt(amount, 10) > (coinDetails?.value || 0);

    const PAYMENT_METHODS = [
        {
            title: "Tether USDT TRC20",
            value: "tether trc20",
            icon: Tether,
            bgColor: "bg-[#E61312]/10",
            borderColor: "border-[#E61312]/30",
            textColor: "text-[#E61312]",
        },
        {
            title: "Ethereum ETH",
            value: "ethereum",
            icon: Ethereum,
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/30",
            textColor: "text-blue-500",
        },
        {
            title: "Tether USDT ERC20",
            value: "tether erc20",
            icon: Tether,
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/30",
            textColor: "text-emerald-500",
        },
        {
            title: "Bitcoin BTC",
            value: "bitcoin",
            icon: Bitcoin,
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/30",
            textColor: "text-orange-500",
        },
    ];

    // Functions
    const reset = () => {
        setWalletAddress("");
        setAmount("");
        setSelectedCoin("");
    }

    const newWithdrawal = useNewStockWithdrawal();
    const handleWithdrawal = () => {
        if (settings.noWithdrawal) return toast.error("Withdrawals are temporarily paused. We're working on it — you can still view your balance.")
        if (!coinDetails) return toast.error("Something went wrong kindly restart the process");
        if (parseInt(amount, 10) > coinDetails.value) return toast.error("The entered amount is greater than available balance");

        const payload = {
            cryptoSymbol: selectedCoin,
            cryptoAmount: coinDetails?.quantity,
            walletAddress,
            usdEquivalent: parseInt(amount, 10),
        }

        newWithdrawal.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.message || "Withdrawal Processing!");
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Withdrawal Failed. Try again.";
                toast.error(message);
            },
        });
    }

    return (
        <main>
            {/* Header */}
            <header className="mb-8">
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">Withdrawal</h1>
                <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Easily Withdraw Your Cryptocurrency Assets
                </p>
            </header>

            {/* Form */}
            <section>
                <p className="mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">Select Cryptocurrency</p>
                <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                    {PAYMENT_METHODS.map((method) => {
                        const Icon = method.icon;
                        const selected = selectedCoin === method.value;

                        return (
                            <button key={method.value} type="button" onClick={() => setSelectedCoin(method.value)}
                                className={` flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${selected
                                    ? `${method.borderColor} ${method.bgColor}` : "border-border hover:border-border/80 bg-card"}`}>

                                <div className={`flex items-center justify-center  rounded-md p-1 ${selected ? method.bgColor : "bg-muted"}`}>
                                    <Icon variant="Bold" className={`${selected ? method.textColor : "text-muted-foreground"} size-6 md:size-6.5 xl:size-7`} />
                                </div>

                                <div className="flex-1 text-left">
                                    <p className="font-semibold">
                                        {method.title}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm capitalize">
                                        {method.value}
                                    </p>
                                </div>

                                {selected && (
                                    <CircleCheckBig className={`${method.textColor} size-4 md:size-4.5 xl:size-5`} />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Amount Input */}
                <div className="space-y-2 mt-4">
                    <label htmlFor="amount" className="block text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Amount
                    </label>
                    <Input disabled={newWithdrawal.isPending} id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)}
                        className={`h-12 montserrat ${passMinimum ? "border-destructive dark:border-destructive" : ""}`} step="0.00000001" min="0" />
                    {coinDetails && (
                        <p className="text-[11px] md:text-xs xl:text-sm montserrat">
                            Your {coinDetails.name}
                            <span className="text-primary capitalize"> Balance: {formatCurrency(coinDetails.value)} • {coinDetails.quantity.toFixed(2)} {coinDetails.id}</span>
                        </p>
                    )}
                </div>

                {/* Wallet Address Input */}
                <div className="space-y-2 mt-4">
                    <label htmlFor="address" className="block text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Wallet Address
                    </label>
                    <Input disabled={newWithdrawal.isPending} id="address" type="text" placeholder="Enter your wallet address (e.g., 0x742d35Cc6634C0532925a3b844Bc9e7595f...)"
                        value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
                        className={`border-border font-mono h-12`}
                    />
                    <p className="text-[10px] text-muted-foreground md:text-xs xl:text-sm">
                        Double-check your wallet address before submitting. Withdrawals cannot be reversed.
                    </p>
                </div>

                {/* Summary Section */}
                {selectedCoin.trim() && amount.trim() && (
                    <div className="bg-muted/30 mt-4 p-4 border border-border rounded-lg">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                <span className="text-muted-foreground">Coin</span>
                                <span className="font-medium text-foreground">{coinDetails?.name}</span>
                            </div>
                            <div className="flex justify-between text-[11px] md:text-xs xl:text-sm montserrat">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-medium text-foreground">
                                    {formatCurrency(parseInt(amount))}
                                </span>
                            </div>
                            <div className="mt-2 pt-2 border-border border-t">
                                <div className="flex justify-between gap-x-2 text-[11px] md:text-xs xl:text-sm">
                                    <span className="text-muted-foreground">Destination</span>
                                    <span className="max-w-xs font-mono font-medium text-foreground text-xs truncate">
                                        {walletAddress || "Pending..."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Button onClick={handleWithdrawal} disabled={passMinimum || newWithdrawal.isPending} className="mt-6 w-full h-10 md:h-11 xl:h-12 capitalize">
                    {newWithdrawal.isPending ? <Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" /> : `Withdraw ${selectedCoin && selectedCoin}`}
                </Button>
            </section>

            {/* Information Alert */}
            <div className="bg-muted/50 mt-6 p-4 border border-border rounded-lg">
                <div className="flex gap-3">
                    <Danger className="flex-shrink-0 mt-0.5 size-5 text-yellow-700 dark:text-yellow-500" />
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
        </main>
    );
}

export default Index;
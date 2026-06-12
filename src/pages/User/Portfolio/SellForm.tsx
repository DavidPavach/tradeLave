import { useState } from "react";

// Services, Utils and Enums
import { formatCurrency } from "@/utils/format";
import { useSellShares } from "@/services/mutations.service";
import { stockMeta } from "@/enum";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { CircleCheckBig, Loader2 } from "lucide-react";
import { Bitcoin, Ethereum, Tether } from "iconsax-reactjs";
import { toast } from "react-fox-toast";

type SellProps = {
    stock: string;
    shares: number;
    marketPrice: number;
    onClose: () => void;
}

const SellForm = ({ stock, shares, marketPrice, onClose }: SellProps) => {

    const [sellShares, setSellShares] = useState<string>(shares.toString());
    const [selectedCoin, setSelectedCoin] = useState<string>("");

    // Constants
    const metaDetails = stockMeta[stock];

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
        setSellShares("");
        setSelectedCoin("");
    }

    const sell = useSellShares();
    const handleSell = () => {
        const payload = {
            stockSymbol: stock,
            sharesToSell: parseInt(sellShares, 10),
            cryptoSymbol: selectedCoin,
            currentPrice: marketPrice,
        }

        sell.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.message || "Shares Sold!");
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to Sell Shares. Try again.";
                toast.error(message);
            },
        });
    }

    return (
        <main>
            {/* Header */}
            <header className="flex items-center gap-x-2 mb-4 montserrat">
                <img src={metaDetails.logo} alt={`${metaDetails.name} logo`} className="rounded-md size-6 md:size-7 xl:size-8" />
                Sell {stock}
            </header>
            {/* Form */}
            <div className="space-y-5 pt-2">
                {/* Price info */}
                <div className="flex justify-between bg-muted/40 p-3 border border-border/30 rounded-lg text-[11px] md:text-xs xl:text-sm">
                    <span className="text-muted-foreground">Market Price</span>
                    <span className="font-bold montserrat">{formatCurrency(marketPrice)}</span>
                </div>

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

                {/* Shares input */}
                <div className="space-y-1.5">
                    <Label htmlFor="shares" className="text-muted-foreground">
                        Number of Shares
                    </Label>
                    <Input
                        id="shares"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={sellShares}
                        onChange={(e) => setSellShares(e.target.value)}
                        className="bg-muted/30 border-border/50 h-11 font-mono text-base"
                    />
                    {shares < parseInt(sellShares, 10) && (
                        <p className="text-destructive text-xs">Exceeds available shares</p>
                    )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center bg-primary/5 p-4 border border-primary/20 rounded-lg">
                    <span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Estimated Total</span>
                    <span className="font-bold text-primary text-sm md:text-base xl:text-lg montserrat">{formatCurrency(parseInt(sellShares, 10) * marketPrice)}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 border-border/50" onClick={onClose} disabled={sell.isPending}>
                        Cancel
                    </Button>
                    <Button
                        className={"bg-violet-600 hover:bg-violet-500 text-white"}
                        disabled={sell.isPending}
                        onClick={handleSell}
                    >
                        {sell.isPending ? <Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" /> : "Place Sell Order"}
                    </Button>
                </div>
            </div>
        </main>
    );
}

export default SellForm;
import { useState } from "react";
import { toast } from "react-fox-toast";

// Enums, Utils and Services
import { stockMeta } from "@/enum";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import { usePurchaseRequest } from "@/services/mutations.service";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { CircleCheckBig, Loader2 } from "lucide-react";
import { useSettings } from "@/services/queries.service";

const Form = ({ prices, onClose }: { prices: Record<string, number>, onClose: () => void; }) => {

    const { data } = useSettings();
    const [selectedStock, setSelectedStock] = useState<string>("")
    const [amount, setAmount] = useState<string>("");

    const settings: Settings = data?.data || {};
    const modified: Record<string, number> = { ...prices, SPCX: settings.sharePrice || 135 }

    // Constants
    const stockPrice = modified[selectedStock] ?? 0;
    const totalUSD = parseInt(amount, 10) * stockPrice;

    // Functions

    const reset = () => {
        setSelectedStock("");
        setAmount("");
    }

    const newRequest = usePurchaseRequest();
    const handleRequest = () => {
        const payload = {
            stockSymbol: selectedStock,
            shares: parseInt(amount, 10),
        }

        newRequest.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.message || "Request Sent!");
                reset();
                onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to Send Request. Try again.";
                toast.error(message);
            },
        });
    }

    return (
        <main>
            <header className="mb-8">
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">New Request</h1>
                <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Fill the form below to submit your request.
                </p>
            </header>

            <Label className="text-muted-foreground">Select Stock</Label>
            <div className="gap-3 grid grid-cols-1 md:grid-cols-2 max-h-96 overflow-y-auto hide-scrollbar">
                {Object.entries(stockMeta).map(([symbol, meta]) => {
                    const selected = selectedStock === symbol;
                    const price = modified[symbol] ?? 0;

                    return (
                        <button key={symbol} type="button" disabled={newRequest.isPending}
                            onClick={() => setSelectedStock(symbol)}
                            className={cn("group flex items-center gap-4 p-2 md:p-3 xl:p-4 border rounded-xl text-left transition-all duration-200 cursor-pointer",
                                selected ? "border-primary bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.08)]"
                                    : "border-border/40 bg-card/60 hover:border-primary/30 hover:bg-card/80",
                                newRequest.isPending && "opacity-50 cursor-not-allowed"
                            )}>
                            {/* Logo */}
                            <div className="flex justify-center items-center bg-muted/50 rounded-md size-10 md:size-12 xl:size-14 shrink-0">
                                <img src={meta.logo} alt={`${meta.name} logo`} className="size-6 md:size-7 xl:size-8 object-contain" />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center gap-3">
                                    <div>
                                        <h3 className="font-bold montserrat">
                                            {symbol}
                                        </h3>

                                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm truncate">
                                            {meta.name}
                                        </p>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <p className="font-bold text-primary montserrat">
                                            {formatCurrency(price)}
                                        </p>

                                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                            Per Share
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Selection Indicator */}
                            <div className={cn("border-2 rounded-full size-5 transition-all shrink-0",
                                selected ? "border-primary bg-primary" : "border-muted-foreground/30")}>
                                {selected && (
                                    <div className="flex justify-center items-center size-full text-primary-foreground">
                                        <CircleCheckBig className="size-4 md:size-4.5 xl:size-5" />
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="space-y-1.5 mt-4">
                <Label htmlFor="amount" className="text-muted-foreground">
                    Number of Shares
                </Label>
                <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-muted/30 border-border/50 h-10 md:h-11 xl:h-12"
                />
                {amount.trim() && (
                    <p className="text-[11px] md:text-xs xl:text-sm">Total Amount(USD): <span className="text-primary montserrat">{formatCurrency(totalUSD)}</span></p>
                )}
            </div>
            {/* Actions */}
            <div className="flex gap-x-5 mt-10">
                <Button variant="outline" className="border-border/50 w-1/2" onClick={onClose} disabled={newRequest.isPending}>
                    Cancel
                </Button>
                <Button
                    className={"bg-orange-600 hover:bg-orange-500 text-white w-1/2"}
                    disabled={newRequest.isPending}
                    onClick={handleRequest}
                >
                    {newRequest.isPending ? <Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" /> : "Place Request Order"}
                </Button>
            </div>
        </main>
    );
}

export default Form;
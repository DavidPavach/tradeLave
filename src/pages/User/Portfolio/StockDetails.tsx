import { useState } from "react";

// Services, Enums and Utils
import { useStockTxs } from "@/services/queries.service";
import { stockMeta } from "@/enum";
import { formatCurrency, sumTxs } from "@/utils/format";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Button } from "@/components/ui/button";
import StockTradingView from "./TradingView";
import HistoryItem from "@/components/HistoryItem";
import { Overlay } from "@/components/Overlay";
import Quick from "../Stocks/Quick";
import SellForm from "./SellForm";

// Icons
import { Loader2 } from "lucide-react";
import { Receipt2, ShoppingCart, TrendUp } from "iconsax-reactjs";



const StockDetails = ({ stock, prices }: { stock: string, prices: Record<string, number> }) => {

    const { data, isLoading, isError, refetch } = useStockTxs(stock);
    const txs: StockTxs[] = data?.data || [];

    const [modal, setModal] = useState<"BUY" | "SELL" | null>(null);

    // Constants
    const currentPrice = prices[stock];
    const { totalUsd, totalShares } = sumTxs(txs);
    const marketValue = totalShares * currentPrice;
    const pnl = marketValue - totalUsd;
    const pnlPct = totalUsd > 0 ? (pnl / totalUsd) * 100 : 0;
    const isPos = pnl >= 0;

    const metaDetails = stockMeta[stock];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Loader2 className="size-6 md:size-7 xl:size-8 text-primary animate-spin" />
            </div>
        )
    }

    if (!isLoading && isError) {
        return <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
    }

    return (
        <>
            {modal === "BUY" && (
                <Overlay open={modal === "BUY"} onClose={() => setModal(null)}>
                    <Quick prefill={stock} />
                </Overlay>
            )}
            {modal === "SELL" && (
                <Overlay open={modal === "SELL"} onClose={() => setModal(null)}>
                    <SellForm stock={stock} marketPrice={currentPrice} shares={totalShares} onClose={() => setModal(null)} />
                </Overlay>
            )}
            <main>
                <header className="flex justify-between items-center gap-4 mb-8">
                    <div className="flex gap-4">
                        <img src={metaDetails.logo} alt={`${metaDetails.name} logo`} className="mt-1 rounded-md size-6 md:size-7 xl:size-8" />
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl montserrat">{stock}</h1>
                                <span
                                    className={`text-[11px] md:text-xs xl:text-sm montserrat font-semibold px-2 py-0.5 rounded-full ${isPos ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500"}`}
                                >
                                    {isPos ? "+" : ""}{pnlPct.toFixed(2)}%
                                </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{metaDetails.name}</p>
                        </div>
                    </div>

                    {/* Buy / Sell buttons */}
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setModal("BUY")}
                            className="gap-2 bg-primary hover:bg-primary/90 px-6 text-primary-foreground"
                        >
                            <ShoppingCart className="size-4" /> Buy
                        </Button>
                        <Button
                            disabled={totalShares === 0}
                            onClick={() => setModal("SELL")}
                            variant="outline"
                            className="gap-2 hover:bg-violet-500/10 px-6 border-violet-500/40 text-violet-500"
                        >
                            <TrendUp className="size-4" /> Sell
                        </Button>
                    </div>
                </header>

                {/* Stats bar */}
                <section className="gap-3 grid grid-cols-2 md:grid-cols-4 mb-8">
                    {[
                        { label: "Market Price", value: formatCurrency(currentPrice) },
                        { label: "Shares Held", value: totalShares },
                        { label: "Market Value", value: formatCurrency(marketValue) },
                        {
                            label: "Unrealised P&L",
                            value: totalShares === 0 ? "—" : `${isPos ? "+" : ""}${formatCurrency(pnl)}`,
                            colour: totalShares === 0 ? undefined : isPos ? "text-emerald-500" : "text-red-500",
                        },
                    ].map(({ label, value, colour }) => (
                        <div key={label} className="bg-card/60 p-4 border border-border/40 rounded-md">
                            <p className="mb-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wide">{label}</p>
                            <p className={`font-bold montserrat ${colour ?? ""}`}>{value}</p>
                        </div>
                    ))}
                </section>

                {/* Two-column layout: chart + transactions */}
                <section className="gap-6 grid grid-cols-1 xl:grid-cols-5">
                    {/* TradingView chart */}
                    <div className="xl:col-span-3 bg-card/60 border border-border/40 rounded-2xl overflow-hidden" style={{ minHeight: 460 }}>
                        <div className="p-4 border-border border-b">
                            <h2 className="font-semibold text-[11px] md:text-xs xl:text-sm capitalize montserrat">{metaDetails.name} Price Chart</h2>
                        </div>
                        <div style={{ height: 420, padding: "1rem" }}>
                            <StockTradingView symbol={stock} />
                        </div>
                    </div>

                    {/* Transaction history */}
                    <div className="xl:col-span-2 bg-card/60 border border-border/40 rounded-2xl overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-border border-b">
                            <h2 className="font-semibold text-[11px] md:text-xs xl:text-sm montserrat">Transaction History</h2>
                            <span className="bg-muted/50 px-2 py-0.5 rounded-full text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                {txs.length} total
                            </span>
                        </div>
                        <div className="space-y-3 p-4 overflow-y-auto hide-scrollbar" style={{ maxHeight: 420 }}>
                            {txs.length === 0 && (
                                <div className="flex flex-col justify-center items-center py-20 h-full text-center">
                                    <div className="flex justify-center items-center bg-muted mb-3 rounded-full size-10 md:size-12 xl:size-14">
                                        <Receipt2
                                            variant="Bulk"
                                            className="size-5 md:size-6 xl:size-7 text-muted-foreground"
                                        />
                                    </div>

                                    <h3 className="font-semibold text-sm md:text-base xl:text-lg">
                                        No History Found
                                    </h3>

                                    <p className="mt-1 max-w-sm text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        You don't have any buy or sell history for {metaDetails.name} share.
                                    </p>
                                </div>
                            )}
                            {txs.length > 0 && txs.map((t) => (
                                <HistoryItem key={t._id} tx={t} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default StockDetails;
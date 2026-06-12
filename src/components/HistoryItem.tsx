import { useState } from "react";
import { motion } from "framer-motion";

// Utils and Enums
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils/format";
import { coinMeta, stockMeta } from "@/enum";

// Components
import TransactionTypeIcon from "./icons/StockTransaction";
import TransactionStatusBadge from "./icons/StatusBadge";

// Icons
import { DirectDown, type Icon, Coin1, Candle, Layer, Wallet1, Hashtag, DollarSquare } from "iconsax-reactjs";

const typeLabels = {
    DEPOSIT: "Deposit",
    WITHDRAWAL: "Withdrawal",
    BUY: "Share Purchase",
    SELL: "Share Sale",
    TRADE_SETTLEMENT: "Trade Settlement",
};

const HistoryItem = ({ tx }: { tx: StockTxs }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    // Constants
    const isPositive = tx.type === "DEPOSIT" || tx.type === "TRADE_SETTLEMENT";

    const isCrypto = tx.type === "DEPOSIT" || tx.type === "WITHDRAWAL" || tx.type === "TRADE_SETTLEMENT";
    const isStock = tx.type === "BUY" || tx.type === "SELL";

    const coinDetails = coinMeta[tx.cryptoSymbol?.toLowerCase() || "ethereum"];
    const stockDetails = stockMeta[tx.stockSymbol?.toUpperCase() || "AAPL"]

    return (
        <main
            className={cn(
                "bg-card/60 backdrop-blur-sm border border-border/40 rounded-xl transition-all duration-200",
                "hover:border-border/70 hover:bg-card/80",
                expanded &&
                "border-primary/20 bg-card/90 shadow-[0_0_20px_hsl(var(--primary)/0.05)]"
            )}
        >
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-3 p-2 md:p-3 xl:p-4 w-full text-left cursor-pointer" >
                {/* Transaction Type Icon */}
                <TransactionTypeIcon type={tx.type} />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold truncate">
                            {typeLabels[tx.type]}
                        </span>
                        <span className="bg-muted/50 px-1.5 py-0.5 rounded text-[10px] text-muted-foreground md:text-[11px] xl:text-xs truncate uppercase">
                            {isCrypto && coinDetails.name}
                            {isStock && stockDetails.name}
                        </span>
                        {isCrypto && coinDetails?.logo && (
                            <img src={coinDetails.logo} alt={coinDetails.name} className="border border-border rounded-full size-5 md:size-5.5 xl:size-6 object-cover" />
                        )}
                        {isStock && stockDetails?.logo && (
                            <img src={stockDetails.logo} alt={stockDetails.name} className="border border-border rounded-full size-5 md:size-5.5 xl:size-6 object-cover" />
                        )}
                    </div>

                    <p className="mt-0.5 text-muted-foreground text-xs">
                        {formatDate(tx.createdAt, "short")}
                    </p>
                </div>

                <div className="flex flex-col gap-y-1">
                    <div className="flex justify-end items-center gap-x-3">
                        <TransactionStatusBadge status={tx.status} />
                        <DirectDown variant="Bold"
                            className={cn(
                                "size-3 md:size-3.5 xl:size-4 text-muted-foreground transition-transform duration-200",
                                expanded && "rotate-180"
                            )}
                        />
                    </div>

                    <div className={cn("flex items-center gap-x-2 font-bold montserrat", isPositive ? "text-green-500" : "text-destructive")}>
                        <p>{isPositive && "+"} {formatCurrency(tx.usdAmount)}</p>
                        {isCrypto && (
                            <p className="text-[11px] text-foreground md:text-xs xl:text-sm">
                                {tx.cryptoAmount?.toFixed(2)}{" "}
                                {coinDetails.symbol}
                            </p>
                        )}
                    </div>
                </div>
            </button>
            {expanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="p-2 md:p-3 xl:p-4">
                        <div className="bg-muted/30 p-4 border border-border/30 rounded-lg">
                            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                {isCrypto && (
                                    <>
                                        <DetailItem
                                            icon={Coin1}
                                            label="Cryptocurrency"
                                            value={coinDetails.name}
                                        />
                                        <DetailItem
                                            icon={Layer}
                                            label="Crypto Amount"
                                            value={`${tx.cryptoAmount?.toFixed(2) || "0.00"} ${coinDetails.symbol}`}
                                        />
                                        {tx.walletAddress && (
                                            <DetailItem
                                                icon={Wallet1}
                                                label="Wallet Address"
                                                value={tx.walletAddress}
                                            />
                                        )}
                                        {tx.hash && (
                                            <DetailItem
                                                icon={Hashtag}
                                                label="Transaction Hash"
                                                value={tx.hash}
                                            />
                                        )}

                                    </>
                                )}

                                {isStock && (
                                    <>
                                        {tx.stockSymbol && (
                                            <DetailItem
                                                icon={Candle}
                                                label="Stock Name"
                                                value={stockDetails.name}
                                            />
                                        )}
                                        {tx.shares && (
                                            <DetailItem
                                                icon={Layer}
                                                label="Shares"
                                                value={tx.shares?.toLocaleString()}
                                            />
                                        )}
                                        {tx.pricePerShare && (
                                            <DetailItem
                                                icon={DollarSquare}
                                                label="Price Per Share"
                                                value={formatCurrency(tx.pricePerShare)}
                                            />
                                        )}
                                    </>
                                )}

                                <DetailItem
                                    icon={DollarSquare}
                                    label="USD Amount"
                                    value={formatCurrency(tx.usdAmount)}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </main>
    );
};

export default HistoryItem;

function DetailItem({ icon: Icon, label, value }: { icon: Icon, label: string, value: number | string }) {

    if (!value && value !== 0) return null;
    return (
        <div className="flex items-start gap-2.5 min-w-0">
            <div className="flex justify-center items-center bg-accent mt-0.5 rounded-md size-6 md:size-7 xl:size-8 text-accent-foreground shrink-0">
                <Icon className="size-3 md:size-3.5 xl:size-4" />
            </div>
            <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">{label}</p>
                <p className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm truncate montserrat">{value}</p>
            </div>
        </div>
    );
}

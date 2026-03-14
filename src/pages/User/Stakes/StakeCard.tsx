import { motion } from "framer-motion";

// Enums and Utils
import { coinMeta } from "@/enum";
import { formatCurrency, formatDate } from "@/utils/format";

// Icons
import { Calendar, WalletAdd } from "iconsax-reactjs";
import { ArrowUpRight } from "lucide-react";

type StakeCardProps = {
    investment: Investment;
};

const statusMap = {
    active: {
        label: "Active",
        classes:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    cancelled: {
        label: "Cancelled",
        classes:
            "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
    },
    completed: {
        label: "Completed",
        classes:
            "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    pending: {
        label: "Pending",
        classes:
            "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
} as const;

const StakeCard = ({ investment }: StakeCardProps) => {
    const coinKey = investment.coin?.toLowerCase?.() || "";
    const coin = coinMeta[coinKey] || {
        name: investment.coin || "Unknown Coin",
        symbol: investment.coin?.slice(0, 4)?.toUpperCase() || "N/A",
        logo: "/coins/default.svg",
    };

    const status =
        statusMap[investment.status as keyof typeof statusMap] || statusMap.pending;

    const profit = investment.returnAmount - investment.capital;
    const isProfitPositive = profit >= 0;

    return (
        <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}
            className="group relative bg-card/80 hover:shadow-primary/5 hover:shadow-xl backdrop-blur-sm p-5 border border-border/60 hover:border-primary/20 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 duration-300">

            <div className="z-10 relative">
                {/* Header */}
                <div className="flex justify-between items-start gap-4 mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="relative flex justify-center items-center bg-background/70 shadow-sm border border-border/60 rounded-2xl size-12 shrink-0">
                            <img src={coin.logo} alt={coin.name} width={28} height={28} className="object-contain" />
                        </div>

                        <div className="min-w-0">
                            <p className="font-medium text-muted-foreground uppercase">
                                {coin.symbol}
                            </p>
                            <h3 className="font-semibold text-base md:text-lg xl:text-xl truncate capitalize">
                                {investment.plan}
                            </h3>
                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm truncate">{coin.name}</p>
                        </div>
                    </div>

                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${status.classes}`}>
                        {status.label}
                    </span>
                </div>

                {/* Main values */}
                <div className="gap-3 grid grid-cols-2 mb-5">
                    <div className="bg-background/50 p-3 border border-border/50 rounded-xl">
                        <p className="mb-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wide">
                            Capital
                        </p>
                        <p className="font-semibold text-sm md:text-base xl:text-lg montserrat">
                            {formatCurrency(investment.capital)}
                        </p>
                    </div>

                    <div className="bg-background/50 p-3 border border-border/50 rounded-xl">
                        <p className="mb-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wide">
                            Return
                        </p>
                        <p className="font-semibold text-sm md:text-base xl:text-lg montserrat">
                            {formatCurrency(investment.returnAmount)}
                        </p>
                    </div>
                </div>

                {/* ROI + Profit */}
                <div className="bg-background/50 mb-5 p-4 border border-border/50 rounded-2xl">
                    <div className="flex justify-between items-center gap-3">
                        <div>
                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wide">
                                Estimated Growth
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">
                                    {investment.roi}%
                                </span>
                                <ArrowUpRight className="size-4 text-emerald-500" />
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wide">
                                Net Profit
                            </p>
                            <p className={`montserrat text-sm font-semibold md:text-base xl:text-lg ${isProfitPositive
                                ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                                {isProfitPositive ? "+" : ""}
                                {formatCurrency(profit)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer details */}
                <div className="gap-3 grid md:grid-cols-2">
                    <div className="flex items-center gap-3 bg-background/40 p-3 border border-border/50 rounded-xl">
                        <div className="flex justify-center items-center bg-primary/10 rounded-full size-9 text-primary">
                            <Calendar className="size-4" />
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Started</p>
                            <p className="font-medium text-[11px] md:text-xs xl:text-sm">{formatDate(investment.startedAt)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-background/40 p-3 border border-border/50 rounded-xl">
                        <div className="flex justify-center items-center bg-primary/10 rounded-full size-9 text-primary">
                            <WalletAdd className="size-4" />
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Ends</p>
                            <p className="font-medium text-[11px] md:text-xs xl:text-sm">{formatDate(investment.endsAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default StakeCard;
import { cn } from "@/lib/utils";
import { DirectboxReceive, DirectboxSend, HomeTrendUp, ShoppingCart, Refresh } from "iconsax-reactjs";

const typeConfig = {
    DEPOSIT: {
        label: "Deposit",
        icon: DirectboxReceive,
        bgClass: "bg-emerald-500/10",
        iconClass: "text-emerald-400",
    },
    WITHDRAWAL: {
        label: "Withdrawal",
        icon: DirectboxSend,
        bgClass: "bg-orange-500/10",
        iconClass: "text-orange-400",
    },
    BUY: {
        label: "Buy",
        icon: ShoppingCart,
        bgClass: "bg-primary/10",
        iconClass: "text-primary",
    },
    SELL: {
        label: "Sell",
        icon: HomeTrendUp,
        bgClass: "bg-violet-500/10",
        iconClass: "text-violet-400",
    },
    TRADE_SETTLEMENT: {
        label: "Settlement",
        icon: Refresh,
        bgClass: "bg-secondary/10",
        iconClass: "text-secondary",
    },
} as const;

export default function TransactionTypeIcon({ type, showLabel = false }: { type: keyof typeof typeConfig, showLabel?: boolean }) {

    const config = typeConfig[type] || typeConfig.DEPOSIT;
    const Icon = config.icon;

    return (
        <div className="flex items-center gap-2.5">
            <div
                className={cn(
                    "flex justify-center items-center rounded-lg size-8 md:size-9 xl:size-10 shrink-0",
                    config.bgClass
                )}
            >
                <Icon className={cn("size-4 md:size-4.5 xl:size-5", config.iconClass)} />
            </div>
            {showLabel && (
                <span className="font-medium text-[11px] md:text-xs xl:text-sm">{config.label}</span>
            )}
        </div>
    );
}
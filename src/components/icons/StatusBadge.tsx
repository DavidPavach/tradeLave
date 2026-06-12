import { Clock, CircleCheckBig, XCircle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
    PENDING: {
        label: "Pending",
        icon: Clock,
        className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    APPROVED: {
        label: "Approved",
        icon: CircleCheckBig,
        className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    REJECTED: {
        label: "Rejected",
        icon: XCircle,
        className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
    COMPLETED: {
        label: "Completed",
        icon: CircleDot,
        className: "bg-primary/10 text-primary border-primary/20",
    },
};

export default function TransactionStatusBadge({ status }: { status: keyof typeof statusConfig }) {
    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full font-medium text-[11px] md:text-xs xl:text-sm",
                config.className
            )}
        >
            <Icon className="size-3 md:size-3.5 xl:size-4" />
            <span className="hidden sm:block">{config.label}</span>
        </span>
    );
}
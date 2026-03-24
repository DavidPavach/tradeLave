import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

// Utils
import { formatCurrency, formatDate } from '@/utils/format';

// Icons
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { BitcoinConvert, DirectboxReceive, Send2, Gift, MinusCirlce, Profile2User } from 'iconsax-reactjs';

type Props = {
    transaction: Transaction;
    onClick?: (tx: Transaction) => void;
    index: number;
};

const ICONS = {
    deposit: DirectboxReceive,
    withdrawal: Send2,
    bonus: Gift,
    penalty: MinusCirlce,
    referral: Profile2User,
    roi: BitcoinConvert
};

const STATUS_CONFIG = {
    successful: {
        icon: CheckCircle2,
        color: 'text-green-600 bg-green-50 dark:bg-green-950/30',
        label: 'Successful'
    },
    pending: {
        icon: Clock,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
        label: 'Pending'
    },
    failed: {
        icon: XCircle,
        color: 'text-red-600 bg-red-50 dark:bg-red-950/30',
        label: 'Failed'
    }
} as const;

export default function TransactionItem({ transaction, onClick, index }: Props) {
    const Icon = ICONS[transaction.transactionType] || BitcoinConvert;
    const StatusIcon = STATUS_CONFIG[transaction.status].icon || Clock;
    const statusConfig = STATUS_CONFIG[transaction.status] || STATUS_CONFIG.pending;

    // Determine accent color based on transactionType
    const typeColorClass =
        transaction.transactionType === 'withdrawal'
            ? 'text-red-600 bg-red-50 dark:bg-red-950/30'
            : transaction.transactionType === 'deposit'
                ? 'text-green-600 bg-green-50 dark:bg-green-950/30'
                : 'text-blue-600 bg-blue-50 dark:bg-blue-950/30';

    // Display amount prefix: withdrawals are negative, others positive/no sign
    const amountPrefix = transaction.transactionType === 'withdrawal' ? '-' : '+';

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-4 hover:bg-accent/10 p-4 border border-border rounded-xl transition-colors cursor-pointer"
            onClick={() => onClick?.(transaction)}>
            {/* Icon */}
            <div className={cn(
                "flex justify-center items-center rounded-xl size-10 group-hover:scale-110 transition-transform shrink-0",
                typeColorClass
            )}>
                <Icon className="size-5" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground text-sm capitalize">{transaction.coin}</h4>

                    <span
                        className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-[10px]",
                            statusConfig.color
                        )}>
                        <StatusIcon className="size-3" />
                        {statusConfig.label}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    {transaction.network &&
                        <>
                            <span>{transaction.network}</span>
                            <span>•</span>
                        </>
                    }
                    <span>{formatDate(transaction.createdAt, 'short')}</span>
                </div>

                {/* Optional details line (e.g., transactionHash or details.summary) */}
                {transaction.transactionHash && (
                    <p className="mt-1 font-mono text-muted-foreground text-xs truncate">
                        {transaction.transactionHash}
                    </p>
                )}
            </div>

            {/* Amount & meta */}
            <div className="ml-2 text-right shrink-0 montserrat">
                <p className={cn(
                    "font-bold text-sm",
                    transaction.transactionType === 'withdrawal' && "text-red-600",
                    transaction.transactionType === 'deposit' && "text-green-600",
                    transaction.transactionType !== 'deposit' && transaction.transactionType !== 'withdrawal' && "text-foreground"
                )}>
                    {amountPrefix}{formatCurrency(transaction.amount)}
                </p>
                <p className="mt-0.5 text-muted-foreground text-xs">{transaction.coinAmount}</p>
            </div>
        </motion.div>
    );
}

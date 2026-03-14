import { Skeleton } from "@/components/ui/skeleton"

export default function TransactionSkeleton() {
    return (
        <div className="flex justify-between items-center py-4">
            {/* Left side */}
            <div className="flex items-center gap-4">
                {/* Coin icon */}
                <Skeleton className="rounded-full size-10" />

                {/* Text section */}
                <div className="space-y-2">
                    {/* Coin + Status */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-20 h-4" />
                        <Skeleton className="rounded-full w-16 h-4" />
                    </div>

                    {/* Network + Date */}
                    <Skeleton className="w-40 h-3" />

                    {/* Wallet address (NOW IN MIDDLE) */}
                    <Skeleton className="w-24 h-3" />
                </div>
            </div>

            {/* Right side */}
            <div className="space-y-2 text-right">
                <Skeleton className="ml-auto w-20 h-4" />
                <Skeleton className="ml-auto w-16 h-3" />
            </div>
        </div>
    )
}

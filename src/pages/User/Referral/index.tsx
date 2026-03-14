// Hooks and Utils
import { useUserAllRefs } from "@/services/queries.service";
import { formatDate } from "@/utils/format";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ReferralSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-4">
                        <Skeleton className="rounded-full size-12" />
                        <div className="space-y-2">
                            <Skeleton className="w-[140px] h-4" />
                            <Skeleton className="w-[180px] h-3" />
                        </div>
                    </div>

                    <div className="space-y-2 text-right">
                        <Skeleton className="w-[80px] h-4" />
                        <Skeleton className="w-[60px] h-3" />
                    </div>
                </div>
            ))}
        </div>
    );
};

const Index = () => {

    const { data, isLoading, isFetching, isError, refetch } = useUserAllRefs();

    // Error State
    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const referrals = data?.data || [];

    return (
        <main className="mx-auto max-w-4xl">
            <header className="mt-4 mb-10 text-center">
                <h1 className="font-bold text-foreground text-2xl md:text-3xl xl:text-4xl capitalize">
                    Your Referrals
                </h1>
                <p className="text-muted-foreground">
                    View all your referral history here.
                </p>
            </header>

            {/* Loading State */}
            {(isLoading || isFetching) && <ReferralSkeleton />}

            {/* Empty State */}
            {!isLoading && !isFetching && referrals.length === 0 && (
                <div className="py-20 text-muted-foreground text-center">
                    You haven’t referred anyone yet.
                </div>
            )}

            {/* Data State */}
            {!isLoading && !isFetching && referrals.length > 0 && (
                <div className="space-y-4">
                    {referrals.map((ref: Referral) => (
                        <div key={ref._id} className="flex justify-between items-center bg-card hover:bg-muted/40 p-2 md:p-3 xl:p-4 border border-border rounded-xl transition">
                            <div className="flex items-center gap-3">
                                <Avatar className="rounded-full size-12 md:size-14 xl:size-16">
                                    <AvatarImage src={ref.referredUser.profilePicture} alt="default profile" />
                                    <AvatarFallback>TL</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium capitalize">
                                        {ref.referredUser.userName}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        {ref.referredUser.email}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className={`font-medium montserrat text-sm md:text-base xl:text-lg ${ref.rewardClaimed > 0 ? "text-green-600" : "text-yellow-600"}`}>
                                    {ref.rewardClaimed}
                                </p>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                    {formatDate(ref.createdAt)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default Index;

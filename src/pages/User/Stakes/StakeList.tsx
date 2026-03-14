// Hooks
import { useUserAllInts } from "@/services/queries.service";

// Hooks
import { ErrorScreen } from "@/components/ErrorComponents";
import ActiveStakes from "./ActiveStakes";
import CompletedStakes from "./CompletedStakes";

const StakeList = () => {
    const { data, isLoading, isFetching, isError, refetch } = useUserAllInts();

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <div className="mb-3 border-4 border-primary border-t-transparent rounded-full size-10 animate-spin" />
                <p className="text-muted-foreground text-sm">
                    Loading your Stakes...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const active = data.data?.filter((i: Investment) => i.status === "active") || [];
    const inactive = data.data?.filter((i: Investment) => i.status !== "active") || [];

    return (
        <main className="space-y-10 bg-background mt-10">
            <ActiveStakes investments={active} />
            <CompletedStakes investments={inactive} />
        </main>
    );
};

export default StakeList;

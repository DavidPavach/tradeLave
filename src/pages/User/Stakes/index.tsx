import { useState } from "react";
import { motion } from "framer-motion";

// Hooks
import { usePlans } from "@/services/queries.service";
import { useCoinDetails } from "@/Hooks/usePrices";

// Components
import Form from "./Form";
import { ErrorScreen } from "@/components/ErrorComponents";
import StakeList from "./StakeList";

const Index = () => {

    const [tab, setTab] = useState<"list" | "new">("new");
    const { data, isFetching, isLoading, isError, refetch } = usePlans();
    const { loading, fetching, isError: DetailsError, refetch: detailsRefetch } = useCoinDetails();

    const isBusy = isFetching || isLoading || loading || fetching;
    const error = isError || DetailsError;

    if (isBusy) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <div className="mb-4 border-4 border-primary border-t-transparent rounded-full size-10 animate-spin" />
                <p className="text-muted-foreground text-sm">
                    Loading Stakes...
                </p>
            </div>
        );
    }

    const refetchAll = () => {
        detailsRefetch();
        refetch();
    }

    if (error) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetchAll} />
        );
    }

    const plans: Plans[] = data.data || []

    return (
        <main>
            <section className="flex flex-col gap-y-1 mt-6 text-center">
                <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl">
                    Stake
                </h1>
                <p className="text-muted-foreground">
                    Earn profits by Staking your cryptocurrency to the different strategies.
                </p>
            </section>

            <section className="relative flex gap-x-2 bg-muted mx-auto mt-6 p-1 rounded-2xl max-w-4xl">
                {(["list", "new"] as const).map((item) => (
                    <button key={item} onClick={() => setTab(item)} className="relative py-2 rounded-xl w-1/2 font-medium cursor-pointer">
                        {tab === item && (
                            <motion.div
                                layoutId="active-tab"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="absolute inset-0 bg-card shadow-sm rounded-xl"
                            />
                        )}
                        <span className={`relative z-10 ${tab === item ? "text-primary" : "text-muted-foreground"}`}>
                            {item === "list" ? "Stake History" : "New Stake"}
                        </span>
                    </button>
                ))}
            </section>
            {tab === "list" && <StakeList />}
            {tab === "new" && <Form plans={plans} />}
        </main>
    );
}

export default Index;
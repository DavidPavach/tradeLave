import { useState } from "react";
import { motion } from "framer-motion";

// Hooks
import { useUserTypeTransactions } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import Form from "./Form";
import TransactionSkeleton from "@/components/TransactionLoading";
import EmptyStates from "@/components/EmptyStates";
import WithdrawalList from "./WithdrawalList";

const Index = () => {

    const [tab, setTab] = useState<"list" | "new">("list");

    const { data, isLoading, isFetching, isError, refetch } = useUserTypeTransactions("withdrawal");
    const items = data?.data?.items ?? [];

    const isBusy = isLoading || isFetching;

    return (
        <main>
            <section className="flex flex-col gap-y-1 mt-6 text-center">
                <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl">
                    Cryptocurrency Withdrawal
                </h1>
                <p className="text-muted-foreground">
                    Withdrawal or send your cryptocurrency assets to any wallet address of your choice.
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
                            {item === "list" ? "My Withdrawals" : "New Withdrawal"}
                        </span>
                    </button>
                ))}
            </section>

            {/* LOADING */}
            {isBusy &&
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TransactionSkeleton key={i} />
                    ))}
                </div>
            }

            {/* ERROR */}
            {!isBusy && isError && (
                <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
            )}

            {/* SUCCESS */}
            {!isBusy && !isError && (
                <>
                    {tab === "list" &&
                        (items.length === 0 ? (
                            <EmptyStates onCreateClick={() => setTab("new")} title="No Withdrawal Requests Yet" description="You haven't created any withdrawal requests. Start by creating your first withdrawal request to any cryptocurrency wallet address of your choice." />
                        ) : (
                            <WithdrawalList withdrawals={items} />
                        ))}

                    {tab === "new" && <Form />}
                </>
            )}
        </main>
    );
}

export default Index;
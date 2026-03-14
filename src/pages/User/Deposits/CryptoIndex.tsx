import { useState } from "react";
import { motion } from "framer-motion"

// Hooks
import { useUserTypeTransactions } from "@/services/queries.service";

// Components
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorScreen } from "@/components/ErrorComponents";
import EmptyStates from "@/components/EmptyStates";
import CryptoTransactionsList from "./CryptoList";
import CryptoForm from "./CryptoForm";


const CryptoIndex = () => {

    const [tab, setTab] = useState<"list" | "new">("list");

    // TODO, paginate later (Default is 1 Page and 50 Limit)
    const { data, isLoading, isFetching, isError, refetch } = useUserTypeTransactions("deposit");

    const transactions: Transaction[] = data?.data?.data ?? [];

    const isBusy = isLoading || isFetching;


    return (
        <main>
            <section className="flex flex-col gap-y-1 mt-6 text-center">
                <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl">
                    Crypto Deposits
                </h1>
                <p className="text-muted-foreground">
                    Manage your crypto deposits and track their status
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
                            {item === "list" ? "My Deposits" : "New Deposit"}
                        </span>
                    </button>
                ))}
            </section>

            {/* LOADING */}
            {isBusy && (
                <>
                    {[...Array(4)].map((_, i) => (
                        <section key={i}>
                            <Skeleton className="flex justify-between items-center bg-neutral-400 dark:bg-neutral-900 my-4 p-4 md:p-5 xl:p-6 rounded-2xl">
                                <div className="space-y-2">
                                    <Skeleton className="w-[100px] sm:w-[150px] md:w-[200px] h-4" />
                                    <Skeleton className="w-[75px] sm:w-[100px] md:w-[150px] h-4" />
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <Skeleton className="w-[75px] sm:w-[100px] md:w-[150px] h-4" />
                                    <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] h-4" />
                                </div>
                            </Skeleton>
                        </section>
                    ))}
                </>
            )}

            {/* ERROR */}
            {!isBusy && isError && (
                <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
            )}

            {/* SUCCESS */}
            {!isBusy && !isError && (
                <>
                    {tab === "list" &&
                        (transactions.length === 0 ? (
                            <EmptyStates onCreateClick={() => setTab("new")} title="No Cryptocurrency Transactions Yet" description="You haven't created any cryptocurrency deposit transactions. Start by creating your first deposit transaction to fund your account." />
                        ) : (
                            <CryptoTransactionsList transactions={transactions} />
                        ))}

                    {tab === "new" && <CryptoForm />}
                </>
            )}

        </main>
    );
}

export default CryptoIndex;
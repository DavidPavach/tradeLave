import { useState } from "react";
import { motion } from "framer-motion";

// Hooks, Constants
import { useAdminTxs } from "@/services/queries.service";
import { TYPE_COLORS } from "./constants";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { TransactionsTable } from "./Table";
import Pagination from "@/components/Pagination";

// Icons
import { Loader2 } from "lucide-react";

const Index = () => {

    const [page, setPage] = useState<number>(1);
    const [tab, setTab] = useState<string>("deposit");
    const { data, isFetching, isLoading, isError, refetch } = useAdminTxs(tab, page, 50);


    if (isFetching || isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading {tab} Transactions</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const txs = data?.data?.data;
    const { pages } = data?.data?.pagination || { total: 1, pages: 1 };

    return (
        <main>
            <header className="my-5 text-center">
                <h1 className="font-bold text-2xl md:text-3xl">Transaction Management</h1>
                <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                    Manage and Track Transactions. <span>Total:</span> {txs.length} transaction{txs.length !== 1 ? 's' : ''}
                </p>
            </header>

            <section className="flex gap-x-1 bg-muted mx-auto mt-6 p-1 rounded-2xl max-w-6xl">
                {["deposit", "withdrawal", "referral", "bonus", "penalty", "roi"].map((item) => (
                    <button key={item} type="button" onClick={() => setTab(item)} className="relative flex-1 p-1 rounded-xl overflow-hidden font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer">
                        {tab === item && (
                            <motion.div layoutId="active-tab" transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className={["absolute inset-0 shadow-sm rounded-xl",
                                    TYPE_COLORS[item as keyof typeof TYPE_COLORS],
                                ].join(" ")}
                            />
                        )}
                        <span className={["relative capitalize z-10", tab === item ? "text-white" : "text-muted-foreground"].join(" ")}>
                            {item}
                        </span>
                    </button>
                ))}
            </section>
            <section className="space-y-5 mt-10">
                <TransactionsTable data={txs} />
                {page > 1 && <Pagination pageSize={pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
            </section>
        </main>
    );
}

export default Index;
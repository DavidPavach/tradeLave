import { useState } from "react";
import { Route } from "@/routes/_dashboard/coin";

// Hooks
import { useUserCoinTransactions } from "@/services/queries.service";

// Components
import TransactionItem from "@/components/TransactionItem";
import TransactionSkeleton from "@/components/TransactionLoading";
import TransactionReceipt from "@/components/TransactionReceipt";
import { ErrorScreen } from "@/components/ErrorComponents";
import Pagination from "@/components/Pagination";

const History = () => {
    const { coin } = Route.useSearch();

    const [page, setPage] = useState(1);
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    const { data, isFetching, isLoading, isError, refetch } = useUserCoinTransactions(coin, page, 50);

    if (isLoading || isFetching) {
        return (
            <main className="space-y-4 bg-background p-6 h-[80vh]">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TransactionSkeleton key={i} />
                ))}
            </main>
        );
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const transactions = data?.data?.data || [];
    const pagination = data?.data.pagination;

    return (
        <main>
            <div className="space-y-6 mx-auto max-w-4xl">
                {/* Header */}
                <div>
                    <h1 className="font-semibold text-foreground text-base md:text-lg xl:text-xl capitalize">
                        {coin} Transaction History
                    </h1>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        View all your {coin} transactions
                    </p>
                </div>

                {/* Empty State */}
                {!transactions.length && (
                    <div className="bg-card p-10 border border-border rounded-xl text-center">
                        <p className="text-destructive">
                            No transactions found.
                        </p>
                    </div>
                )}

                {/* Transactions */}
                <div className="space-y-3">
                    {transactions.map((tx: Transaction, index: number) => (
                        <TransactionItem index={index} key={tx._id} transaction={tx} onClick={() => setSelectedTx(tx)} />
                    ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.pages > 1 && (
                    <div className="flex justify-center pt-6">
                        <Pagination pageSize={pagination.pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />
                    </div>
                )}
            </div>

            {/* Receipt Modal */}
            {selectedTx && (
                <TransactionReceipt transaction={selectedTx} onClose={() => setSelectedTx(null)} />
            )}
        </main>
    );
};

export default History;

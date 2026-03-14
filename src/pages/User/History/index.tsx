import { useState } from "react";

// Hooks
import { useUserAllTxs } from "@/services/queries.service";

// Components
import TransactionItem from "@/components/TransactionItem";
import TransactionSkeleton from "@/components/TransactionLoading";
import TransactionReceipt from "@/components/TransactionReceipt";
import { ErrorScreen } from "@/components/ErrorComponents";
import Pagination from "@/components/Pagination";

const Index = () => {

    const [page, setPage] = useState(1);
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    const { data, isLoading, isFetching, isError, refetch } = useUserAllTxs(page, 50);

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
        <main className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mt-10 text-center">
                <h1 className="font-bold text-foreground text-2xl md:text-3xl xl:text-4xl capitalize">
                    Your Transaction History
                </h1>
                <p className="text-muted-foreground">
                    View all your transactions.
                </p>
            </header>

            {/* Empty State */}
            {!transactions.length && (
                <div className="bg-card p-10 border border-border rounded-xl text-center">
                    <p className="text-muted-foreground text-sm">
                        No transactions found.
                    </p>
                </div>
            )}

            {/* Transactions */}
            <div className="space-y-3 mt-10">
                {transactions.map((tx: Transaction, index: number) => (
                    <TransactionItem index={index} key={tx._id} transaction={tx} onClick={() => setSelectedTx(tx)} />
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
                <div className="flex justify-center pt-6">
                    <Pagination pageSize={pagination.pages} page={page} defaultPage={page} onPageChange={(p) => setPage(p)} />
                </div>
            )}

            {/* Receipt Modal */}
            {
                selectedTx && (
                    <TransactionReceipt transaction={selectedTx} onClose={() => setSelectedTx(null)} />
                )
            }
        </main >
    );
}

export default Index;
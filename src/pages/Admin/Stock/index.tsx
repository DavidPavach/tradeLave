import { useState } from "react";

// Services, Enums
import { useGetStockTxs } from "@/services/queries.service";
import { PAGE_LIMIT } from "@/enum";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import Pagination from "@/components/Pagination";
import TransactionRow from "./Transaction";

// Icons
import { Loader2 } from "lucide-react";

const Index = () => {

    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError, refetch } = useGetStockTxs(page, PAGE_LIMIT);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Stock Transactions</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const txs: AdminStockTxs[] = data?.data.data ?? [];
    const pagination = data?.data.meta;

    return (
        <main>
            <header className="mb-8">
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">Stock Transactions</h1>
                <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Manage All Stock Transactions
                </p>
            </header>
            <div className="space-y-3">
                {txs.map((tx) => (
                    <TransactionRow key={tx._id} tx={tx} />
                ))}
            </div>
            {pagination.totalPages > 1 && (
                <Pagination
                    pageSize={pagination.totalPages}
                    defaultPage={page}
                    page={page}
                    onPageChange={setPage}
                />
            )}
        </main>
    );
}

export default Index;
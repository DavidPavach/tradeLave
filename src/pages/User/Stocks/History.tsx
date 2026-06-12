// Services
import { ErrorScreen } from "@/components/ErrorComponents";
import HistoryItem from "@/components/HistoryItem";
import { useStockHistory } from "@/services/queries.service";

// Icons
import { ArrowRotateRight, Clock, Receipt2 } from "iconsax-reactjs";

const History = () => {

    const { data, isLoading, isError, refetch } = useStockHistory(1, 5);

    const history: StockTxs[] = data?.data?.data || [];

    return (
        <main className="bg-card/70 shadow-sm backdrop-blur-sm p-4 border border-border rounded-3xl">
            <header className="flex items-center gap-x-3">
                <div className="flex justify-center items-center bg-primary/10 rounded-xl size-10 md:size-11 xl:size-12">
                    <Clock className="size-5 md:size-5.5 xl:size-6 text-primary" variant="Bold" />
                </div>

                <div>
                    <h1 className="font-bold text-base md:text-lg xl:text-xl">
                        Transaction History
                    </h1>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Last 5 Transactions
                    </p>
                </div>
            </header>
            {isLoading && (
                <div className="place-content-center grid h-40">
                    <div className="text-center">
                        <ArrowRotateRight className="size-4 md:size-4.5 xl:size-5 text-muted-foreground animate-spin" />
                        <h3 className="animate-pulse">Loading...</h3>
                    </div>
                </div>
            )}
            {!isLoading && history.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-10 text-center">
                    <div className="flex justify-center items-center bg-muted mb-3 rounded-full size-10 md:size-12 xl:size-14">
                        <Receipt2
                            variant="Bulk"
                            className="size-5 md:size-6 xl:size-7 text-muted-foreground"
                        />
                    </div>

                    <h3 className="font-semibold text-sm md:text-base xl:text-lg">
                        No History Found
                    </h3>

                    <p className="mt-1 max-w-sm text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        No History Yet, Kindly perform some Transactions.
                    </p>
                </div>
            ) : (
                <div className="space-y-3 mt-6">
                    {history.map((t) => (
                        <HistoryItem key={t._id} tx={t} />
                    ))}
                </div>
            )}
            {isError && (
                <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
            )}
        </main>
    );
}

export default History;
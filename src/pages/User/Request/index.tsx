import { useState } from "react";

// Services
import { usePurchaseRequest, useStockPrices } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Button } from "@/components/ui/button";
import { Overlay } from "@/components/Overlay";
import Form from "./Form";
import RequestCard from "./RequestCard";

// Icons
import { AddSquare, ClipboardText } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";

const Index = () => {

    const [newForm, setNewForm] = useState<boolean>(false);
    const { data, isLoading, isError, refetch } = usePurchaseRequest();
    const { data: stockData, isLoading: stockLoading, isError: stockError, refetch: stockRefetch } = useStockPrices();

    const requests: StockRequest[] = data?.data || [];
    const STOCKS: Record<string, number> = stockData?.data || {};

    const isBusy = isLoading || stockLoading;
    const hasError = isError || stockError;

    const reload = () => {
        refetch();
        stockRefetch();
    }

    if (isBusy) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Loader2 className="size-6 md:size-7 xl:size-8 text-primary animate-spin" />
            </div>
        )
    }

    if (!isBusy && hasError) {
        return <ErrorScreen variant="card" size="sm" type="500" onRetry={reload} />
    }

    // Functions
    const toggleNew = () => setNewForm((prev) => !prev);

    return (
        <>
            {newForm && (
                <Overlay open={newForm} onClose={toggleNew}>
                    <Form prices={STOCKS} onClose={toggleNew} />
                </Overlay>
            )}
            <main>
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <section className="flex gap-x-3">
                        <div className="flex justify-center items-center bg-primary/10 rounded-md size-10 md:size-11 xl:size-12">
                            <ClipboardText className="size-5 md:size-5.5 xl:size-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">
                                Stock Requests
                            </h1>
                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                {requests.length} requests
                            </p>
                        </div>
                    </section>
                    <Button onClick={toggleNew}>
                        <AddSquare className="size-4 md:size-4.5 xl:size-5" />
                        New Request
                    </Button>
                </header>
                {requests.length === 0 &&
                    <div className="flex flex-col justify-center items-center py-24 text-center">
                        <div className="flex justify-center items-center bg-muted/50 mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                            <ClipboardText className="size-6 md:size-7 xl:size-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-1 font-heading font-semibold text-base md:text-lg xl:text-xl">No requests yet</h3>
                        <p className="max-w-xs text-[11px] text-muted-foreground md:text-xs xl:text-sm capitalize">
                            Submit your first bank stock purchase request using the button above.
                        </p>
                    </div>
                }
                <section className="space-y-3">
                    {requests.map((r) => (
                        <RequestCard key={r._id} request={r} />
                    ))}
                </section>
            </main>
        </>
    );
}

export default Index;
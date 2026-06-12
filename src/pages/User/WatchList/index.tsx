// Services
import { useSettings, useStockTxs } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import Details from "./Details";
import Fomo from "./Fomo";

// Icons
import { Loader2 } from "lucide-react";

const Index = () => {

    const { data, isLoading, isError, refetch } = useSettings();
    const { data: txsData, isLoading: txsLoading, isError: txsError, refetch: txsRefetch } = useStockTxs('SPCX');

    const settings: Settings = data?.data || {};
    const txs: StockTxs[] = txsData?.data || [];

    // Constants
    const isBusy = isLoading || txsLoading;
    const hasError = isError || txsError;

    // Functions
    const retry = () => {
        refetch();
        txsRefetch();
    }

    if (isBusy) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Loader2 className="size-6 md:size-7 xl:size-8 text-primary animate-spin" />
            </div>
        )
    }

    if (!isBusy && hasError) {
        return <ErrorScreen variant="card" size="sm" type="500" onRetry={retry} />
    }

    return txs.length > 0 ? <Details price={settings.sharePrice} txs={txs} /> : <Fomo price={settings.sharePrice} />
}

export default Index;
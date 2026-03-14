import { useState } from "react";

// Services
import { useAdminRts } from "@/services/queries.service";

// Components
import Thread from "./Thread";
import { ErrorScreen } from "@/components/ErrorComponents";
import Pagination from "@/components/Pagination";

// Icons
import { Loader2 } from "lucide-react";

const Index = () => {

    const [page, setPage] = useState<number>(1);
    const { data, isFetching, isLoading, isError, refetch } = useAdminRts(page, 50);

    if (isFetching || isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Deposit Request</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const items = data?.data?.items || [];
    const pages = data?.data?.pages || 1;

    return (
        <main>
            <header className="my-5 text-center">
                <h1 className="font-bold text-2xl md:text-3xl">Bank Deposit Request</h1>
                <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                    Manage and Track Your User's Bank Deposit Request.
                </p>
            </header>

            {items.map((item: AdminDepositRequest) => (
                <Thread key={item._id} item={item} />
            ))}
            {page > 1 && <Pagination pageSize={pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
        </main>
    );
}

export default Index;
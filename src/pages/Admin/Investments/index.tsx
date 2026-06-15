import { useState } from "react";

// Services, Enums
import { useAdminInts } from "@/services/queries.service";
import { PAGE_LIMIT } from "@/enum";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import IntsList from "./Investment";
import Pagination from "@/components/Pagination";

// Icons
import { Loader2 } from "lucide-react";

const Index = () => {

    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError, refetch } = useAdminInts(page, PAGE_LIMIT);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Investments</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const ints = data?.data?.data || [];
    const pages = data?.data?.pages || 1;

    return (
        <main>
            {ints.map((item: AdminInts) => (
                <IntsList key={item._id} investments={ints} />
            ))}
            {page > 1 && <Pagination pageSize={pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
        </main>
    );
}

export default Index;
import { useState } from "react";

// Services
import { useAdminRefs } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { ReferralsList } from "./Referral";

// Icons
import { Loader2 } from "lucide-react";
import Pagination from "@/components/Pagination";

const Index = () => {

    const [page, setPage] = useState<number>(1);
    const { data, isFetching, isLoading, isError, refetch } = useAdminRefs(page, 50);

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Referrals</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const referrals = data?.data?.data || [];
    const pages = data?.data?.pages || 1;

    return (
        <main>
            <ReferralsList referrals={referrals} />
            {page > 1 && <Pagination pageSize={pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
        </main>
    );
}

export default Index;
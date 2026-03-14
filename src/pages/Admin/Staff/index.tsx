// Hooks
import { useGetAdmins } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";

// Icons
import { Loader2 } from "lucide-react";
import Table from "./Table";

const Index = () => {

    const { data, isFetching, isLoading, isError, refetch } = useGetAdmins();

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="mt-1 text-muted-foreground text-sm">
                    Loading Staff...
                </p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        )
    }

    const staff = data?.data || [];

    return (
        <main>
            <div className="mb-10 text-center">
                <h1 className="font-bold text-2xl md:text-3xl">Staff Management</h1>
                <p>Manage Your Admins</p>
            </div>
            <Table staff={staff} />
        </main>
    );
}

export default Index;
import { useState } from "react";
import { Route } from "@/routes/_admin/users";

// Hooks
import { useAdminUsers } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import Table from "./Table";
import Profile from "./Profile";
import Pagination from "@/components/Pagination";

// Icons
import { Loader2 } from "lucide-react";

const Index = () => {

    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, isError, refetch } = useAdminUsers(page, 50);
    const search = Route.useSearch();
    const accountId = search.profile;


    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Users</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const users: User[] = data?.data.data ?? [];
    const pagination = data?.data.pagination;

    const userProfile = accountId ? users.find(account => account.accountId === accountId) : null

    return (
        <main>
            {userProfile ? <Profile profile={userProfile} /> :
                (
                    <main className="space-y-5">
                        <header className="my-5 text-center">
                            <h1 className="font-bold text-2xl md:text-3xl">User Management</h1>
                            <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                                Manage and Track All Your Users.
                            </p>
                        </header>
                        <Table users={users} />
                        {pagination && pagination.pages > 1 && <Pagination pageSize={pagination.pages ?? 1} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
                    </main>
                )}
        </main>
    );
}

export default Index;
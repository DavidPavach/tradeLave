import { useState } from "react";

// Services
import { useAdminPlans } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Button } from "@/components/ui/button";
import PlanEditor from "./Plan";

// Icons
import { Loader2 } from "lucide-react";
import Form from "./Form";

const Index = () => {

    const [open, setOpen] = useState<boolean>(false);
    const { data, isFetching, isLoading, isError, refetch } = useAdminPlans();

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Plans</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const plans = data?.data || [];

    const toggleOpen = () => setOpen((o) => !o);

    return (
        <main>
            <section className="flex justify-between items-center">
                <header className="my-5 text-center">
                    <h1 className="font-bold text-2xl md:text-3xl">Plans Management</h1>
                    <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                        Manage and Track Your User's Plans.
                    </p>
                </header>
                <Button type="button" onClick={toggleOpen}>
                    Create Plan
                </Button>
            </section>
            <Form isOpen={open} toggleOpen={toggleOpen} />
            <PlanEditor plans={plans} />
        </main>
    );
}

export default Index;
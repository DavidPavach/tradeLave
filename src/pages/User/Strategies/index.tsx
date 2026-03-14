// Hooks and Utils
import { usePlans } from "@/services/queries.service";
import { formatCurrency } from "@/utils/format";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Link } from "@tanstack/react-router";

const Index = () => {

    const { data, isFetching, isLoading, isError, refetch } = usePlans();
    const plans: Plans[] = data?.data || []

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <div className="mb-4 border-4 border-primary border-t-transparent rounded-full size-10 animate-spin" />
                <p className="text-muted-foreground text-sm">
                    Loading Strategies...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    return (
        <main>
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mt-6 mb-10 text-center">
                    <h1 className="font-bold text-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight">
                        Strategies
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Choose a strategy that aligns with your financial goals
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan: Plans) => {
                        const isLand = plan.type === "land";

                        return (
                            <div key={plan._id} className="bg-card shadow-sm hover:shadow-md p-6 border border-border rounded-xl transition">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="font-semibold text-foreground text-sm md:text-base xl:text-lg uppercase montserrat">
                                        {plan.title}
                                    </h2>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${isLand ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                                        {isLand ? "Land" : "Crypto"}
                                    </span>
                                </div>

                                {/* Metrics */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                        <span className="text-muted-foreground">Min Investment</span>
                                        <span className="font-medium text-foreground montserrat">
                                            {formatCurrency(plan.minValue)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                        <span className="text-muted-foreground">Max Investment</span>
                                        <span className="font-medium text-foreground montserrat">
                                            {formatCurrency(plan.maxValue)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                        <span className="text-muted-foreground">ROI</span>
                                        <span className="font-semibold text-primary">
                                            {plan.roi}%
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-medium text-foreground">
                                            {plan.durationDays} day
                                            {plan.durationDays > 1 ? "s" : ""}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-[11px] md:text-xs xl:text-sm">
                                        <span className="text-muted-foreground">
                                            Max Re-staking
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {plan.maxExecutions >= 999999 ? "Unlimited" : plan.maxExecutions}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link to="/stakes" search={{ plan: `${plan.title}` }} className="block bg-primary hover:bg-primary/90 mt-6 px-4 py-2 rounded-lg w-full font-medium text-primary-foreground text-center transition">
                                    Select Plan
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default Index;
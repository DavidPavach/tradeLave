import { Route } from "@/routes/_dashboard/portfolio";

// Services, Utils and Enums
import { usePortfolio, useStockPrices } from "@/services/queries.service";
import { formatCurrency } from "@/utils/format";
import { stockMeta } from "@/enum";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";

// Icons
import { ArrowSquareRight, Briefcase, BrifecaseTick, Coin1, DollarSquare, Graph, Icon } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import StockDetails from "./StockDetails";

const Index = () => {

    const { stock } = Route.useSearch();
    const { data, isLoading, isError, refetch } = usePortfolio();
    const { data: stockData, isLoading: stockLoading, isError: stockError, refetch: stockRefetch } = useStockPrices();

    const portfolio: Portfolio = data?.data || {};
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


    return (
        <>
            {stock !== undefined ?
                <StockDetails stock={stock} prices={STOCKS} />
                :
                <>
                    {/* Header */}
                    <header className="flex gap-3 mb-8">
                        <div className="flex justify-center items-center bg-primary/10 rounded-md size-10 md:size-11 xl:size-12">
                            <BrifecaseTick className="size-5 md:size-5.5 xl:size-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">My Portfolio</h1>
                            <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                {portfolio.assets.stocks.length} active position{portfolio.assets.stocks.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </header>

                    {/* Stats */}
                    <section className="gap-3 grid grid-cols-2 lg:grid-cols-4 mb-8" >
                        <Stat icon={Briefcase} label="Stock Holdings" value={portfolio.assets.stocks.length} />
                        <Stat icon={Coin1} label="Crypto Value" value={formatCurrency(portfolio.summary.totalCryptoValueUsd)} />
                        <Stat icon={Graph} label="Stock Value" value={formatCurrency(portfolio.summary.totalStockValueUsd)} />
                        <Stat icon={DollarSquare} label="Portfolio Value" value={formatCurrency(portfolio.summary.totalPortfolioValueUsd)} />
                    </section >

                    {/* Stats */}
                    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" >
                        {
                            Object.entries(STOCKS).map(([symbol, price]) => {
                                const meta = stockMeta[symbol];
                                const holdings = portfolio.assets.stocks.find(s => s.symbol === symbol);

                                if (!meta) return null;

                                return (
                                    <StockCard
                                        key={symbol}
                                        symbol={symbol}
                                        name={meta.name}
                                        logo={meta.logo}
                                        value={holdings?.totalValueUsd || 0}
                                        price={price}
                                        holdings={holdings?.shares || 0}
                                    />
                                );
                            })
                        }
                    </div>
                </>
            }
        </>
    );
}

export default Index;

function Stat({ icon: Icon, label, value }: { icon: Icon, label: string, value: number | string }) {
    return (
        <div className="flex gap-x-3 bg-card/60 backdrop-blur-sm p-2 md:p-3 xl:p-4 border border-border/40 rounded-xl">
            <div className="flex justify-center items-center bg-primary/10 rounded-lg size-8 md:size-9 xl:size-10 shrink-0">
                <Icon className="size-4 md:size-4.5 xl:size-5 text-primary" />
            </div>
            <div>
                <p className="text-[11px] text-muted-foreground text-xs xl:text-sm tracking-wide">{label}</p>
                <p className={`text-base md:text-lg xl:text-xl font-bold montserrat`}>{value}</p>
            </div>
        </div>
    );
}

type StockCardProps = {
    logo: string;
    name: string;
    value: number;
    price: number;
    symbol: string;
    holdings: number;
}

function StockCard({ logo, name, value, price, symbol, holdings }: StockCardProps) {
    return (
        <Link to="/portfolio" search={{ stock: symbol }} className={cn(
            "group flex flex-col gap-4 bg-card/60 backdrop-blur-sm p-4 border border-border/40 rounded-2xl",
            "hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_0_24px_hsl(var(--primary)/0.08)]",
            "transition-all duration-200 cursor-pointer"
        )}>

            {/* Header */}
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                    <img src={logo} alt={`${name} logo`} className="rounded-md size-6 md:size-7 xl:size-8" />
                    <div>
                        <h2 className="font-bold montserrat">{symbol}</h2>
                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm line-clamp-1">{name}</p>
                    </div>
                </div>
                <ArrowSquareRight className="size-4 md:size-4.5 xl:size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </header>

            {/* Price row */}
            <div className="flex justify-between items-end">
                <div>
                    <p className="mb-0.5 text-[11px] text-muted-foreground uppercase tracking-wider">Current Market value (USD)</p>
                    <p className="font-bold text-lg md:text-xl xl:text-2xl montserrat">{formatCurrency(value)}</p>
                </div>
            </div>

            {/* Stats row */}
            <div className="gap-2 grid grid-cols-3 pt-3 border-border/30 border-t">
                <div>
                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">Shares</p>
                    <p className="font-semibold montserrat">{holdings}</p>
                </div>
                <div>
                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">Current Cost</p>
                    <p className="font-semibold montserrat">{formatCurrency(price)}</p>
                </div>
            </div>
        </Link>
    )
}
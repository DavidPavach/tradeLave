// Components
import StockTradingView from "../Portfolio/TradingView";

const index = () => {
    return (
        <main className="space-y-2">
            <header>
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">Market Trends</h1>
                <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Current Market Trends and Rates
                </p>
            </header>

            <div className="gap-5 space-y-2 grid grid-cols-1 sm:grid-cols-2 mt-6">
                <div style={{ height: 400 }} className="bg-card/60 p-4 rounded-md">
                    <p className="mb-2">AAPL</p>
                    <StockTradingView symbol="AAPL" />
                </div>
                <div style={{ height: 400 }} className="bg-card/60 p-4 rounded-md">
                    <p className="mb-2">GOOGL</p>
                    <StockTradingView symbol="GOOGL" />
                </div>
                <div style={{ height: 400 }} className="bg-card/60 p-4 rounded-md">
                    <p className="mb-2">TSLA</p>
                    <StockTradingView symbol="TSLA" />
                </div>
                <div style={{ height: 400 }} className="bg-card/60 p-4 rounded-md">
                    <p className="mb-2">MSFT</p>
                    <StockTradingView symbol="MSFT" />
                </div>
                <div style={{ height: 400 }} className="bg-card/60 p-4 rounded-md">
                    <p className="mb-2">AMZN</p>
                    <StockTradingView symbol="AMZN" />
                </div>
            </div>
        </main>
    );
}

export default index;
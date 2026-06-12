// Components
import Quick from "../Stocks/Quick";

const index = () => {
    return (
        <main>
            <header className="mb-8">
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">Buy Shares</h1>
                <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Quickly buy any shares you desire
                </p>
            </header>
            <Quick />
        </main>
    );
}

export default index;
import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks, Enums, Utils and Services
import { usePortfolioBalances } from "@/Hooks/useStockCoins";
import { stockMeta } from "@/enum";
import { formatCurrency } from "@/utils/format";
import { useNewShares } from "@/services/mutations.service";

// Icons
import { ArrowDown2, ReceiptText, Wallet3 } from "iconsax-reactjs";
import { Loader } from "lucide-react";

const Form = ({ price, onClose }: { price: number, onClose: () => void }) => {

    const [selectedCoin, setSelectedCoin] = useState<string>("ethereum");
    const [showCoins, setShowCoins] = useState<boolean>(false);
    const [shares, setShares] = useState<number>(1);

    const { getAllCoinBalances } = usePortfolioBalances();
    const holdings = getAllCoinBalances();

    // Constants
    const selectedCoinData = holdings.find((coin) => coin.id === selectedCoin);
    const selectedCoinBalance = selectedCoinData?.value ?? 0;

    const totalCost = price * shares;
    const canAfford = selectedCoinBalance >= totalCost;
    const maxShares = price > 0 ? Math.floor(selectedCoinBalance / price) : 0;
    const metaDetails = stockMeta["SPCX"];

    const formattedTotal = totalCost.toLocaleString();

    const newShares = useNewShares();
    const handleBuy = () => {
        const payload = {
            stockSymbol: "SPCX",
            usdInvestmentAmount: totalCost,
            cryptoSymbol: selectedCoin,
            currentPrice: price,
        }
        newShares.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.message || "Shares Purchased!");
                onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to Purchase Shares. Try again.";
                toast.error(message);
            },
        });
    }

    return (
        <main>
            {/* Header */}
            <header className="flex gap-x-3">
                <img src={metaDetails.logo} alt={`${metaDetails.name} logo`} className="size-6 md:size-7 xl:size-8 arounded-md" />
                <div>
                    <h1 className="font-bold text-base md:text-lg xl:text-xl">
                        Buy SPCX
                    </h1>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Purchase {metaDetails.name} shares quickly and securely
                    </p>
                </div>
            </header>

            {/* Stock */}
            <div className="flex justify-between items-center bg-accent/10 hover:bg-accent/20 mt-6 px-4 py-3 border border-border rounded-2xl w-full transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-x-3">
                    <img src={metaDetails.logo} alt={metaDetails.name} className="rounded-full size-8 md:size-9 xl:size-10" />

                    <div className="text-left">
                        <p className="font-semibold">
                            SPCX
                        </p>
                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                            {metaDetails.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Coin Select */}
            <div className="mt-6">
                <label className="block mb-1.5 font-medium">
                    Payment Coin
                </label>

                <div className="relative">
                    <button type="button"
                        onClick={() => setShowCoins(!showCoins)}
                        className="flex justify-between items-center bg-accent/10 hover:bg-accent/20 px-4 py-3 border border-border rounded-2xl w-full transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-x-3">
                            <img src={selectedCoinData?.logo} alt={selectedCoinData?.name} className="rounded-full size-8 md:size-9 xl:size-10" />

                            <div className="text-left">
                                <p className="font-semibold capitalize">
                                    {selectedCoin}
                                </p>

                                <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs montserrat">
                                    {formatCurrency(selectedCoinBalance)}
                                </p>
                            </div>
                        </div>

                        <ArrowDown2 className={`size-5 transition-transform duration-300 ${showCoins ? "rotate-180" : ""}`} variant="Bold" />
                    </button>

                    {showCoins && (
                        <div className="top-[105%] left-0 z-10 absolute bg-card shadow-2xl border border-border rounded-2xl w-full max-h-[250px] overflow-y-auto hide-scrollbar">
                            {holdings.map((coin) => (
                                <button key={coin.id} type="button" onClick={() => { setSelectedCoin(coin.id); setShowCoins(false); }}
                                    className={`flex cursor-pointer items-center gap-x-3 hover:bg-primary/5 px-4 py-3 border-border/50 border-b last:border-b-0 w-full text-left transition-all duration-300 ${selectedCoin === coin.id
                                        ? "bg-primary/10" : ""}`}>
                                    <div className="relative">
                                        <img src={coin.logo} alt={coin.name} className="rounded-full size-8 md:size-9 xl:size-10" />
                                        {selectedCoin === coin.id && (
                                            <div className="right-0 bottom-0 absolute bg-primary border-2 border-card rounded-full size-3" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <p className="font-semibold truncate">
                                                {coin.symbol}
                                            </p>

                                            <p className="font-semibold text-primary montserrat">
                                                {formatCurrency(coin.value)}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center gap-x-3">
                                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs truncate">
                                                {coin.name}
                                            </p>

                                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs montserrat">
                                                {coin.quantity.toFixed(2)} {coin.symbol}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Shares */}
            <div className="mt-6">
                <label className="block mb-1.5 font-medium">
                    Number of Shares
                </label>
                <div className="flex items-center gap-x-3 bg-accent/10 px-4 border border-border focus-within:border-primary/30 rounded-2xl">
                    <ReceiptText className="size-5 text-muted-foreground" variant="Bold" />

                    <input type="number" min={1} value={shares} onChange={(e) => setShares(Number(e.target.value))} placeholder="Enter shares"
                        className="bg-transparent py-3 border-border focus:border-primary outline-none focus:outline-0 focus:ring-0 w-full" />
                </div>
                <p className="mt-2 text-[10px] text-primary md:text-[11px] xl:text-xs">
                    Maximum shares you can buy: {maxShares}
                </p>
            </div>

            {/* Summary */}
            <div className="bg-primary/5 mt-6 p-4 border border-primary/10 rounded-3xl">
                <div className="flex items-center gap-x-2 mb-5">
                    <Wallet3 className="size-5 text-primary" variant="Bold" />
                    <h2 className="font-semibold text-sm md:text-base xl:text-lg">
                        Purchase Summary
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">
                            Stock
                        </p>
                        <div className="flex items-center gap-x-2">
                            <img src={metaDetails.logo} alt={`${metaDetails.name} logo`} className="rounded-full size-6" />
                            <p className="font-semibold">SPCX</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">Share Price</p>
                        <p className="font-semibold montserrat">${price}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground"> Shares</p>
                        <p className="font-semibold">{shares}</p>
                    </div>

                    <div className="my-2 bg-border h-px" />

                    <div className="flex justify-between items-center">
                        <p className="font-medium">Total Cost</p>
                        <p className="font-bold text-primary text-base md:text-lg xl:text-xl montserrat">${formattedTotal}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">Wallet Balance</p>
                        <p className="font-semibold montserrat">{formatCurrency(selectedCoinBalance)} ~ {selectedCoinData?.quantity.toFixed(2)}{selectedCoinData?.symbol} </p>
                    </div>

                    <div className={`mt-4 rounded-2xl px-4 py-3 text-[11px] md:text-xs xl:text-sm font-medium 
                                        ${canAfford ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}`}>
                        {canAfford ? "Sufficient balance for this purchase" : "Insufficient balance"}
                    </div>
                </div>
            </div>

            <button onClick={handleBuy} type="button" disabled={!canAfford || newShares.isPending}
                className="bg-primary hover:opacity-90 disabled:opacity-50 mt-8 py-4 rounded-2xl w-full font-semibold text-primary-foreground transition-all duration-300 cursor-pointer disabled:cursor-not-allowed">
                {newShares.isPending ? <Loader className="mx-auto size-4 xl:size-5 animate-spin md:size.4.5" /> : 'Buy Shares'}
            </button>
        </main>
    );
}

export default Form;
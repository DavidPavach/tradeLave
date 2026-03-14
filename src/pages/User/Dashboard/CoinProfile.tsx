import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Hooks, Enums and Utils
import { usePrices, useUserBalance } from "@/services/queries.service";
import { coinMap, coinMeta } from "@/enum";
import { formatCryptoAmount, formatCurrency, formatPercentage } from "@/utils/format";

// Components
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorScreen } from "@/components/ErrorComponents";

// Icons
import { Eye, EyeSlash, Refresh2 } from "iconsax-reactjs";

const CoinProfile = () => {

    const { data, isLoading, isFetching, refetch, isError } = usePrices();
    const { data: balanceData, isLoading: isBalanceLoading, isFetching: isBalanceFetching, refetch: refetchBalance, isError: isBalanceError } = useUserBalance();
    const [see, setSee] = useState<boolean>(true);

    // Functions
    const toggleSee = () => setSee((prev) => !prev);
    const refetchAll = () => {
        refetch();
        refetchBalance();
    }

    // Generate Coin Profile List
    let profileList: Array<{ id: string; name: string; symbol: string; logo: string; price: number; priceChange24h: number; holdings: number; balance: number }> = [];
    if (balanceData && balanceData.data && data && data.data) {
        profileList = Object.entries(balanceData.data as Record<string, number>).map(
            ([key, amount]) => {
                const meta = coinMeta[key.toLowerCase()] ?? {
                    name: key,
                    symbol: key.toUpperCase(),
                    logo: "/coins/coin.svg",
                };

                const apiKey = coinMap[key.toLowerCase()];
                const priceObj = data.data[apiKey];
                const price = priceObj?.usd ?? 0;
                const priceChange = priceObj?.usd_24h_change ?? 0;
                const balance = amount;
                return {
                    id: key,
                    name: meta.name,
                    symbol: meta.symbol,
                    logo: meta.logo,
                    price,
                    priceChange24h: priceChange,
                    holdings: amount / price,
                    balance,
                };
            }
        );
    }


    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg md:text-xl xl:text-2xl">Your Cryptocurrency Portfolio</h1>
                <div className="flex gap-x-5">
                    {see ? <Eye className="size-5 md:size-6 xl:size-7 hover:text-primary transition-colors cursor-pointer" onClick={toggleSee} /> : <EyeSlash className="size-5 md:size-6 xl:size-7 hover:text-primary transition-colors cursor-pointer" onClick={toggleSee} />}
                    <Refresh2 onClick={() => refetchAll()} className="size-5 md:size-6 xl:size-7 hover:text-primary transition-colors cursor-pointer" />
                </div>
            </div>
            {(isFetching || isLoading || isBalanceLoading || isBalanceFetching) && [...Array(7)].map((_, i) => (
                <section key={`price-skeleton-${i}`} className="flex justify-between items-center my-4">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="rounded-full size-10" />
                        <div className="space-y-2">
                            <Skeleton className="w-[200px] h-3" />
                            <Skeleton className="w-[150px] h-3" />
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end space-y-2">
                        <Skeleton className="w-[150px] h-3" />
                        <Skeleton className="w-[100px] h-3" />
                    </div>
                </section>
            ))}
            {(isError || isBalanceError) && (
                <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
            )}
            <section className="bg-card p-2 border border-border rounded-2xl">
                {profileList
                    .sort((a, b) => b.balance - a.balance)
                    .map((asset) => (
                        <Link to={`/coin`} search={{ coin: asset.name.toLowerCase() }} key={asset.id} className="block bg-card p-2 border-border border-b transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 bg-card rounded-full w-10 h-10 overflow-hidden">
                                        <img src={asset.logo} alt={asset.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{asset.name}</div>
                                        <div className="text-muted-foreground text-sm">{asset.symbol}</div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-medium montserrat">{formatCurrency(asset.price)}</div>
                                    <div className={`text-sm ${asset.priceChange24h >= 0 ? "text-green-500" : "text-destructive"}`}>
                                        {formatPercentage(asset.priceChange24h)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <div>
                                    <div className="text-muted-foreground text-sm">Holdings</div>
                                    <div className="font-medium montserrat">
                                        {!see ? "••••••" : `${formatCryptoAmount(asset.holdings)} ${asset.symbol}`}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-muted-foreground text-sm">Value</div>
                                    <div className="font-medium montserrat">
                                        {!see ? "••••••" : formatCurrency(asset.balance)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </section>
        </motion.div >
    );
}

export default CoinProfile;
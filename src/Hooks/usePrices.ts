// Hooks
import { usePrices, useUserBalance } from '@/services/queries.service';
import { coinMap, coinMeta } from '@/enum';


type PriceObj = { usd?: number; usd_24h_change?: number, usd_market_cap?: number, usd_24h_vol?: number };
type PricesResponse = { data: Record<string, PriceObj> };
type BalanceResponse = {
    data: {
        bitcoin: number;
        dogecoin: number;
        ethereum: number;
        ripple: number;
        "shiba inu": number;
        solana: number;
        "usd coin": number;
        "tether erc20": number;
        "tether trc20": number;
    };
};

export type CoinDetails = {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    price: number;
    priceChange24h: number;
    userBalance: number;
    holdings: number;
    usdEquiv: number;
    marketCap: number;
    tradingVolume: number;
};

export const useCoinDetails = () => {
    const {
        data: pricesData,
        isLoading: pricesLoading,
        isFetching: pricesFetching,
        isError: pricesError,
        refetch: refetchPrices,
    } = usePrices() as {
        data?: PricesResponse;
        isLoading: boolean;
        isFetching: boolean;
        isError: boolean;
        refetch: () => void;
    };

    const {
        data: balancesData,
        isLoading: balancesLoading,
        isFetching: balancesFetching,
        isError: balancesError,
        refetch: refetchBalances,
    } = useUserBalance() as {
        data?: BalanceResponse;
        isLoading: boolean;
        isFetching: boolean;
        isError: boolean;
        refetch: () => void;
    };

    const loading = pricesLoading || balancesLoading;
    const fetching = pricesFetching || balancesFetching;
    const isError = !!pricesError || !!balancesError;

    const refetch = () => {
        refetchPrices();
        refetchBalances();
    };

    const getCoinDetails = (coinKey: string): CoinDetails => {
        const key = coinKey.toLowerCase();
        const apiKey = coinMap[key];
        const priceObj = pricesData?.data?.[apiKey];
        const price = priceObj?.usd ?? 0;
        const priceChange = priceObj?.usd_24h_change ?? 0;
        const marketCap = priceObj?.usd_market_cap ?? 0;
        const tradingVolume = priceObj?.usd_24h_vol ?? 0;

        const userBalance = balancesData?.data?.[key as keyof BalanceResponse['data']] ?? 0;
        const holdings = userBalance;
        const usdEquiv = userBalance * price;
        const meta = coinMeta[key] ?? { name: coinKey, symbol: coinKey.toUpperCase(), logo: undefined };

        return {
            id: coinKey,
            name: meta.name,
            symbol: meta.symbol,
            logo: meta.logo,
            price,
            priceChange24h: priceChange,
            userBalance,
            holdings,
            usdEquiv,
            marketCap,
            tradingVolume
        };
    };

    return { getCoinDetails, loading, fetching, isError, refetch };
};

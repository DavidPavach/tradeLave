import { useStockBalance } from "@/services/queries.service";
import { coinMap, coinMeta } from "@/enum";

type CoinBalanceDetails = {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    quantity: number;
    price: number;
    value: number;
    allocation: number;
};

export const usePortfolioBalances = () => {
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useStockBalance();

    const portfolio = data?.data;

    const balances = portfolio?.cryptoBalances ?? {};
    const prices = portfolio?.cryptoPrices ?? {};

    const getCoinBalance = (
        coinKey: string
    ): CoinBalanceDetails | null => {
        const quantity = balances?.[coinKey] ?? 0;

        const apiKey = coinMap[coinKey.toLowerCase()];

        const price = prices?.[apiKey]?.usd ?? 0;

        const meta = coinMeta[coinKey.toLowerCase()];

        if (!meta) return null;

        return {
            id: coinKey,
            name: meta.name,
            symbol: meta.symbol,
            logo: meta.logo,
            quantity,
            price,
            value: quantity * price,
            allocation: 0,
        };
    };

    const getAllCoinBalances = (): CoinBalanceDetails[] => {
        const coins = Object.keys(balances);

        const holdings = coins
            .map(getCoinBalance)
            .filter(Boolean) as CoinBalanceDetails[];

        const totalPortfolioValue = holdings.reduce(
            (sum, coin) => sum + coin.value,
            0
        );

        return holdings.map((coin) => ({
            ...coin,
            allocation:
                totalPortfolioValue > 0
                    ? (coin.value / totalPortfolioValue) * 100
                    : 0,
        }));
    };

    const getTotalBalance = (): number => {
        return getAllCoinBalances().reduce(
            (sum, coin) => sum + coin.value,
            0
        );
    };

    return {
        getCoinBalance,
        getAllCoinBalances,
        getTotalBalance,

        totalDeposits:
            portfolio?.totalVolume?.totalDeposits ?? 0,

        totalWithdrawals:
            portfolio?.totalVolume?.totalWithdrawals ?? 0,

        loading: isLoading,
        fetching: isFetching,
        isError,
        refetch,
    };
};
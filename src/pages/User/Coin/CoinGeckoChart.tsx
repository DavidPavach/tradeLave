import React from "react";

import { useExternalScript } from "@/Hooks/useExternalScript";

// Routes, Stores and Enums
import { Route } from "@/routes/_dashboard/coin";
import { useThemeStore } from "@/stores/theme.store";
import { coinMap } from "@/enum";

const CoinGeckoChart = () => {

    const { coin } = Route.useSearch();
    const { theme } = useThemeStore();

    const { loaded, error } = useExternalScript(
        'https://widgets.coingecko.com/gecko-coin-price-chart-widget.js'
    );

    if (error) return <p>Failed to load chart</p>;
    if (!loaded) return <p>Loading chart...</p>;

    const coinId = coinMap[coin.toLowerCase()];
    const darkMode = theme === "dark" ? "true" : "false";

    return React.createElement(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'gecko-coin-price-chart-widget' as any,
        {
            locale: 'en',
            'dark-mode': darkMode,
            'coin-id': coinId,
            'initial-currency': 'usd',
            outlined:"true",
        }
    );
};

export default CoinGeckoChart;

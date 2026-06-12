import { memo, useEffect, useRef } from "react";

// Stores
import { useThemeStore } from "@/stores/theme.store";

function TradingViewWidget() {

    const { theme } = useThemeStore()
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        
        if (!containerRef.current) {
            return;
        }

        containerRef.current.innerHTML = "";

        const widgetContainer = document.createElement("div");

        widgetContainer.className =
            "tradingview-widget-container__widget";

        containerRef.current.appendChild(widgetContainer);

        const script = document.createElement("script");

        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";

        script.type = "text/javascript";
        script.async = true;

        script.innerHTML = JSON.stringify({
            symbols: [
                ["Apple", "NASDAQ:AAPL|1D"],
                ["Google", "NASDAQ:GOOGL|1D"],
                ["Microsoft", "NASDAQ:MSFT|1D"],
                ["Tesla", "NASDAQ:TSLA|1D"],
                ["Amazon", "NASDAQ:AMZN|1D"],
            ],
            chartType: "candlesticks",
            colorTheme: theme,
            locale: "en",
            autosize: true,
            width: "100%",
            height: 400,
        });

        widgetContainer.appendChild(script);

        return () => {
            if (containerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                containerRef.current.innerHTML = "";
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="tradingview-widget-container"
            style={{ width: "100%" }}
        />
    );
}

export default memo(TradingViewWidget);
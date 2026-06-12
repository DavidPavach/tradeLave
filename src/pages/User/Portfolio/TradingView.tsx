import { useEffect, useRef } from "react";

export default function StockTradingView({ symbol }: { symbol: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clean up previous widget
        if (widgetRef.current) {
            container.innerHTML = "";
        }

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: `NASDAQ:${symbol}`,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            calendar: false,
            hide_volume: false,
            support_host: "https://www.tradingview.com",
            backgroundColor: "rgba(17, 19, 30, 0)",
            gridColor: "rgba(100, 200, 200, 0.04)",
        });

        container.appendChild(script);
        widgetRef.current = script;

        return () => {
            if (container) {
                container.innerHTML = "";
            }
        };
    }, [symbol]);

    return (
        <div className="w-full h-full tradingview-widget-container" ref={containerRef} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }} />
        </div>
    );
}
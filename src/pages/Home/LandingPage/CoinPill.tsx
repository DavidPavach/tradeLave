import type { MarketRow } from "@/enum";
import { formatChange, formatPrice } from "@/utils/format";

export function CoinPill({ row }: { row: MarketRow }) {

    const isUp = row.change24h >= 0;

    return (
        <div className="flex items-center gap-3 bg-card/80 shadow-sm backdrop-blur px-4 py-3 border border-border/70 rounded-2xl transition-transform hover:-translate-y-0.5 duration-300">
            <img src={row.logo} alt={row.name} className="bg-background p-1 border border-border/60 rounded-full size-10" />
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-3">
                    <div>
                        <p className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">{row.symbol}</p>
                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs truncate">{row.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm montserrat">{formatPrice(row.price, row.symbol)}</p>
                        <p className={`text-[10px] md:text-[11px] xl:text-xs font-medium ${isUp ? "text-primary" : "text-destructive"}`}>
                            {formatChange(row.change24h)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
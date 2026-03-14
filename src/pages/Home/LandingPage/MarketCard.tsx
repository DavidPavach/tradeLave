import { motion } from "framer-motion";

// Enums and Utils
import type { MarketRow } from "@/enum";
import { formatChange, formatPrice } from "@/utils/format";

// Components
import { fadeUp } from "../../../components/MotionPreset";

export function MarketCard({ row }: { row: MarketRow }) {
    const isUp = row.change24h >= 0;

    return (
        <motion.div variants={fadeUp} className="bg-card/90 shadow-sm hover:shadow-xl backdrop-blur p-5 border border-border/70 rounded-3xl transition-all hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <img src={row.logo} alt={row.name} className="bg-background p-1.5 border border-border/70 rounded-full size-12" />
                    <div>
                        <p className="font-semibold text-foreground">{row.name}</p>
                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{row.symbol}</p>
                    </div>
                </div>
                <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isUp ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                    {formatChange(row.change24h)}
                </div>
            </div>

            <p className="mb-5 font-semibold text-foreground text-lg md:text-xl xl:text-2xl tracking-tight montserrat">{formatPrice(row.price, row.symbol)}</p>

            <div className="bg-background/70 p-3 border border-border/60 rounded-2xl h-24 overflow-hidden">
                <div className="flex items-end gap-1.5 h-full">
                    {[22, 48, 38, 62, 56, 74, 58, 84, 72, 90].map((height, index) => (
                        <div key={`${row.symbol}-${index}`}
                            className={`w-full rounded-full ${isUp ? "bg-primary/75" : "bg-destructive/75"}`}
                            style={{ height: `${height}%` }} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
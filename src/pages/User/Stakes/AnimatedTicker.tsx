import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Enums and Utils
import { coinMeta } from "@/enum";
import { formatCurrency, formatTimeLeft } from "@/utils/format";

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const AnimatedTicker = ({ investment }: { investment: Investment }) => {
    const meta = coinMeta[investment.coin];

    const start = useMemo(
        () => new Date(investment.startedAt).getTime(),
        [investment.startedAt]
    );
    const end = useMemo(
        () => new Date(investment.endsAt).getTime(),
        [investment.endsAt]
    );

    const totalGain = investment.returnAmount - investment.capital;

    const [displayAmount, setDisplayAmount] = useState(investment.capital);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const update = () => {
            const now = Date.now();

            const rawProgress = (now - start) / (end - start);
            const clampedProgress = clamp(rawProgress, 0, 1);

            const currentValue =
                investment.capital + totalGain * clampedProgress;

            setDisplayAmount(currentValue);
            setProgress(clampedProgress);

            const remaining = Math.max(end - now, 0);
            setTimeLeft(formatTimeLeft(remaining));
        };

        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [start, end, investment.capital, totalGain]);

    return (
        <div className="relative bg-card shadow-sm mx-auto p-5 border border-border rounded-xl overflow-hidden">
            {/* Subtle animated glow */}
            <motion.div className="absolute inset-0 bg-primary/5" animate={{ opacity: [0.2, 0.45, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} />

            <div className="relative space-y-4">
                {/* Header */}
                <div className="flex justify-between">
                    <h3 className="font-semibold capitalize">
                        {investment.plan}
                    </h3>
                    <span className="bg-primary/10 px-2 py-1 rounded-full text-[10px] text-primary md:text-[11px] xl:text-xs">
                        Active
                    </span>
                </div>

                {/* Coin */}
                <p className="flex items-center gap-x-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Coin:
                    <span className="flex items-center gap-x-1">
                        <img src={meta.logo} className="size-5" alt={meta.name + " logo"} />
                        <span>{meta.name}</span>
                    </span>
                </p>

                {/* Values */}
                <section className="flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                            Live Value
                        </p>
                        <p className="font-semibold text-primary text-sm md:text-base xl:text-lg montserrat">
                            ${displayAmount.toFixed(2)}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                            ROI Value
                        </p>
                        <p className="font-semibold text-primary text-sm md:text-base xl:text-lg montserrat">
                            {formatCurrency(investment.returnAmount)}
                        </p>
                    </div>
                </section>

                {/* Progress bar */}
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                        <span>Progress</span>
                        <span>{Math.floor(progress * 100)}%</span>
                    </div>

                    <div className="bg-muted rounded-full w-full h-1.5 overflow-hidden">
                        <motion.div className="bg-primary h-full" initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }} transition={{ ease: "linear", duration: 0.6 }} />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                    <span>ROI: {investment.roi}%</span>
                    <span>Ends in: {timeLeft}</span>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTicker;

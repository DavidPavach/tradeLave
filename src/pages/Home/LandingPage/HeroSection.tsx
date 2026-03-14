import { motion } from "framer-motion";

// Enums
import type { MarketRow } from "@/enum";

// Components
import { CoinPill } from "./CoinPill";
import { fadeUp } from "../../../components/MotionPreset";

// Icons
import { ArrowRight, BadgeCheck, ChevronRight } from "lucide-react";

const trustPoints = [
    "Live pricing for active coins",
    "Clear wallet and transfer flows",
    "Security-conscious user journeys",
    "Designed for global audience",
];

const heroMetrics = [
    { value: "24/7", label: "Market access" },
    { value: "9", label: "Supported active coins" },
    { value: "<10m", label: "Typical onboarding flow" },
];

export function HeroSection({ featuredMarkets }: { featuredMarkets: MarketRow[] }) {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0),transparent_30%,transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.04))]" />

            <div className="items-center gap-14 grid lg:grid-cols-[1.1fr_0.9fr] mx-auto px-6 lg:px-8 py-24 md:py-32 xl:py-40 max-w-7xl min-h-dvh">
                <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} className="z-10 relative">

                    <motion.h1 variants={fadeUp}
                        className="mt-6 max-w-3xl font-bold text-foreground text-4xl sm:text-5xl md:text-6xl xl:text-7xl capitalize leading-tight tracking-[-0.04em] montserrat">
                        Stake digital assets with more trust, less noise.
                    </motion.h1>

                    <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-muted-foreground text-base md:text-lg xl:text-xl leading-8">
                        A cleaner crypto experience built around transparent pricing, secure wallet flows, and a product language that feels credible from the first click.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex sm:flex-row flex-col gap-4 mt-8">
                        <a href="#markets"
                            className="inline-flex justify-center items-center gap-2 bg-primary shadow-lg shadow-primary/20 px-4 md:px-5 xl:px-6 py-3.5 rounded-2xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-transform hover:-translate-y-0.5 duration-300">
                            Explore live markets
                            <ArrowRight className="size-4" />
                        </a>
                        <a href="#security" className="inline-flex justify-center items-center gap-2 bg-card hover:bg-muted px-4 md:px-5 xl:px-6 py-3.5 border border-border rounded-2xl font-semibold text-[11px] text-foreground md:text-xs xl:text-sm transition-colors">
                            Review security approach
                            <ChevronRight className="size-4" />
                        </a>
                    </motion.div>

                    <motion.div variants={fadeUp} className="gap-3 grid sm:grid-cols-2 mt-10">
                        {trustPoints.map((point) => (
                            <div key={point} className="flex items-center gap-3 bg-card/70 backdrop-blur px-4 py-3 border border-border/70 rounded-2xl text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                <BadgeCheck className="size-4 text-primary" />
                                {point}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative">
                    <div className="top-10 -left-10 absolute bg-primary/10 blur-3xl rounded-full size-40" />
                    <div className="-right-8 bottom-6 absolute bg-accent/20 blur-3xl rounded-full size-40" />

                    <div className="bg-card/80 shadow-2xl backdrop-blur-xl p-4 border border-border/70 rounded-[2rem]">
                        <div className="bg-background/80 p-5 border border-border/70 rounded-[1.6rem]">
                            <div className="flex justify-between items-center gap-4 pb-4 border-border/70 border-b">
                                <div>
                                    <p className="font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">Portfolio overview</p>
                                    <p className="mt-1 font-semibold text-foreground text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">$84,320.40</p>
                                </div>
                                <div className="bg-primary/10 px-3 py-1 rounded-full font-semibold text-[11px] text-primary md:text-xs xl:text-sm">
                                    +4.28% today
                                </div>
                            </div>

                            <div className="gap-3 grid mt-5">
                                {featuredMarkets.slice(0, 4).map((row) => (
                                    <CoinPill key={row.key} row={row} />
                                ))}
                            </div>

                            <div className="gap-3 grid sm:grid-cols-3 mt-5">
                                {heroMetrics.map((metric) => (
                                    <div key={metric.label} className="bg-card px-4 py-4 border border-border/70 rounded-2xl">
                                        <p className="font-semibold text-foreground text-base md:text-lg xl:text-xl">{metric.value}</p>
                                        <p className="mt-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-[0.18em]">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
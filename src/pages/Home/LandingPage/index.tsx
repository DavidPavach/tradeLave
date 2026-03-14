import { useMemo } from "react";
import { motion } from "framer-motion";

// Enums and Hooks
import { COINS, coinMeta } from "@/enum";
import { useLiveMarkets } from "@/Hooks/useLiveMarket";

// Components
import { FeatureCard } from "./FeatureCard";
import { HeroSection } from "./HeroSection";
import { MarketCard } from "./MarketCard";
import { SectionEyebrow } from "../../../components/Eyebrow";
import { fadeUp } from "../../../components/MotionPreset";

// Icons
import { AlertTriangle, Globe2, LineChart, Lock, BadgeCheck } from "lucide-react";
import { ShieldSecurity, WalletCheck } from "iconsax-reactjs";

const productHighlights = [
    {
        icon: ShieldSecurity,
        title: "Security-first custody",
        description:
            "Client assets are protected with layered controls, withdrawal review flows, and auditable operational policies.",
    },
    {
        icon: LineChart,
        title: "Transparent execution",
        description:
            "Simple pricing, clear spreads, and live market snapshots across the assets your customers actually use.",
    },
    {
        icon: BadgeCheck,
        title: "Compliance-led onboarding",
        description:
            "A cleaner onboarding experience designed around trust, verification, and operational clarity.",
    },
    {
        icon: WalletCheck,
        title: "Purpose-built wallet flows",
        description:
            "Deposit, hold, convert, and withdraw with an interface designed to reduce friction and increase confidence.",
    },
];

const platformMetrics = [
    { value: "24/7", label: "Market access" },
    { value: "9", label: "Supported active coins" },
    { value: "<10m", label: "Typical onboarding flow" },
    { value: "100%", label: "Clear fee visibility" },
];

const Index = () => {

    const { markets, isLoading } = useLiveMarkets();

    const featuredMarkets = useMemo(() => {
        if (markets.length > 0) return markets;

        return COINS.map((key: string) => ({
            key,
            symbol: coinMeta[key].symbol,
            name: coinMeta[key].name,
            logo: coinMeta[key].logo,
            price: 0,
            change24h: 0,
        }));
    }, [markets]);

    return (
        <main>
            <div className="top-0 z-0 fixed inset-x-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_55%)] opacity-[0.08] h-72 pointer-events-none" />
            <HeroSection featuredMarkets={featuredMarkets} />
            <section className="bg-card/40 py-6 border-border/70 border-y">
                <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 mx-auto px-4 md:px-5 lg:px-8 xl:px-6 max-w-7xl">
                    {platformMetrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                            <p className="font-semibold text-foreground text-lg md:text-xl xl:text-2xl tracking-tight">{metric.value}</p>
                            <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="mx-auto px-4 md:px-6 xl:px-8 py-24 max-w-7xl">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
                    <motion.div variants={fadeUp} className="mb-12 text-center">
                        <SectionEyebrow>Why it feels different</SectionEyebrow>
                        <h2 className="mt-5 font-semibold text-foreground text-2xl sm:text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                            A sharper, more credible landing experience.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-7">
                            The page is rebuilt around your theme tokens, lighter visual noise, cleaner hierarchy, and reusable components that are easier to maintain.
                        </p>
                    </motion.div>

                    <div className="gap-5 grid md:grid-cols-2 xl:grid-cols-4">
                        {productHighlights.map((feature) => (
                            <FeatureCard key={feature.title} {...feature} />
                        ))}
                    </div>
                </motion.div>
            </section>
            <section id="markets" className="bg-card/30 py-24 border-border/70 border-y">
                <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                        <motion.div variants={fadeUp} className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4 mb-12">
                            <div>
                                <SectionEyebrow>Active assets</SectionEyebrow>
                                <h2 className="mt-5 font-semibold text-foreground text-2xl sm:text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                                    Live market cards powered by your coin enum.
                                </h2>
                            </div>
                            <div className="bg-background/70 backdrop-blur px-4 py-3 border border-border/70 rounded-2xl max-w-xl text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                {isLoading ? "Loading live prices…"
                                    : "Prices refresh automatically and each asset card uses the symbol, name, and logo from your coinMeta enum."}
                            </div>
                        </motion.div>

                        <div className="gap-5 grid sm:grid-cols-2 xl:grid-cols-4">
                            {featuredMarkets.map((row) => (
                                <MarketCard key={row.key} row={row} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            <section id="security" className="mx-auto px-4 md:px-6 xl:px-8 py-24 max-w-7xl">
                <div className="items-center gap-10 grid lg:grid-cols-[0.95fr_1.05fr]">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5 }}>
                        <SectionEyebrow>Security posture</SectionEyebrow>
                        <h2 className="mt-5 font-semibold text-foreground text-2xl sm:text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                            Professional without feeling cold.
                        </h2>
                        <p className="mt-5 max-w-xl text-muted-foreground text-sm md:text-base xl:text-lg leading-8">
                            The design now leans on card surfaces, restrained gradients, tighter spacing, and semantic theme tokens instead of hard-coded colors, which gives the product a stronger brand system and makes dark mode more consistent.
                        </p>

                        <div className="space-y-4 mt-8">
                            {[
                                "All key sections now use background, card, border, primary, accent, muted, and destructive theme variables.",
                                "The layout has been simplified into reusable blocks so the page is easier to scale.",
                                "Live market data is fetched dynamically instead of being hard-coded.",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3 bg-card/70 px-4 py-4 border border-border/70 rounded-2xl text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                    <Lock className="mt-0.5 size-4 text-primary" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="bg-card/80 shadow-xl backdrop-blur p-4 md:p-5 xl:p-6 border border-border/70 rounded-[2rem]">
                        <div className="gap-4 grid sm:grid-cols-2">
                            {[
                                { icon: Globe2, title: "Global-ready brand tone", text: "Clearer messaging for a broader market and stronger first-impression trust." },
                                { icon: ShieldSecurity, title: "Semantic theming", text: "No more emerald, red, yellow, or slate hard-coding across the page UI." },
                                { icon: WalletCheck, title: "Enum-driven assets", text: "Every coin card reads from one source of truth for logo, symbol, and display name." },
                                { icon: LineChart, title: "Live data flow", text: "Prices and 24h movement update from a market API on an interval." },
                            ].map(({ icon: Icon, title, text }) => (
                                <div key={title} className="bg-background/70 p-5 border border-border/70 rounded-3xl">
                                    <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-11 text-primary">
                                        <Icon className="size-5" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">{title}</h3>
                                    <p className="mt-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-6">{text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            <section className="bg-card/30 py-24 border-border/70 border-t">
                <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-5xl text-center">
                    <SectionEyebrow>Ready to ship</SectionEyebrow>
                    <h2 className="mt-5 font-semibold text-foreground text-2xl sm:text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                        Cleaner system. Better first impression.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-8">
                        This version gives you a more premium landing page structure, removes the hard-coded color palette, and makes your coin showcase dynamic and maintainable.
                    </p>

                    <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mt-8">
                        <a href="#markets" className="inline-flex justify-center items-center gap-2 bg-primary shadow-lg shadow-primary/20 px-4 md:px-5 xl:px-6 py-3.5 rounded-2xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm">
                            See live asset cards
                        </a>
                        <a href="#" className="inline-flex justify-center items-center gap-2 bg-background px-4 md:px-5 xl:px-6 py-3.5 border border-border rounded-2xl font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
                            Connect signup flow
                        </a>
                    </div>
                </div>
            </section>

            <footer className="bg-background py-6 border-border/70 border-t">
                <div className="flex justify-center items-start gap-2 mx-auto px-4 md:px-6 xl:px-8 max-w-7xl text-center">
                    <AlertTriangle className="mt-0.5 size-4 text-destructive shrink-0" />
                    <p className="max-w-4xl text-muted-foreground text-xs leading-6">
                        Risk warning: digital assets can be volatile. Ensure product messaging, disclosures, and claims align with your jurisdiction, compliance requirements, and actual custody or trading capabilities before publishing.
                    </p>
                </div>
            </footer>
        </main>
    );
}

export default Index;
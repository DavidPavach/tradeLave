import { motion } from "framer-motion";

// Components
import { SectionEyebrow } from "@/components/Eyebrow";

export function ServicesPageHero() {
    return (
        <section className="relative border-border/70 border-b overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_42%)] opacity-[0.08]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.05))]" />

            <div className="relative mx-auto px-4 md:px-6 xl:px-8 py-24 md:py-32 xl:py-40 max-w-5xl text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                    <SectionEyebrow>Our services</SectionEyebrow>
                    <h1 className="mx-auto mt-6 max-w-4xl font-semibold text-foreground text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-tight tracking-[-0.04em]">
                        Everything you need, with clearer structure and less friction.
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-8">
                        From trading to wallets, optional earn products, and compliance onboarding, this page is rebuilt to feel more premium, more readable, and more trustworthy.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Components
import { SectionEyebrow } from "@/components/Eyebrow";

// Icons
import { ArrowRight } from "lucide-react";

export function AboutHero() {
    return (
        <section className="relative border-border/70 border-b overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_42%)] opacity-[0.08]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.05))]" />

            <div className="relative mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-32 xl:py-40 max-w-6xl text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                    <SectionEyebrow>About Trade Lave</SectionEyebrow>
                    <h1 className="mx-auto mt-6 max-w-5xl font-semibold text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.98] tracking-[-0.05em]">
                        Built on trust,
                        <span className="block bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-transparent">
                            clarity, and discipline.
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-8">
                        Trade Lave is a digital-asset platform shaped around one idea: financial services should feel transparent, secure, and professionally operated from the first interaction.
                    </p>

                    <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mt-8">
                        <Link to="/services" className="inline-flex justify-center items-center gap-2 bg-primary shadow-lg shadow-primary/20 px-6 py-3.5 rounded-2xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-transform hover:-translate-y-0.5 duration-300">
                            Explore services
                            <ArrowRight className="size-4" />
                        </Link>
                        <Link to="/contact" className="inline-flex justify-center items-center gap-2 bg-card hover:bg-muted px-6 py-3.5 border border-border rounded-2xl font-semibold text-[11px] text-foreground md:text-xs xl:text-sm transition-colors">
                            Contact us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Components
import type { ServiceItem } from "./ServiceData";
import { fadeUp } from "@/components/MotionPreset";
import { ServiceFeatureList } from "./FeatureList";
import { ServiceRiskNote } from "./RiskNote";

// Icons
import { ArrowRight } from "lucide-react";

export function ServiceSection({ service, reverse = false }: { service: ServiceItem, reverse?: boolean }) {

    const Icon = service.icon;

    return (
        <motion.div variants={fadeUp} className={`grid items-start gap-8 py-14 lg:grid-cols-2 lg:gap-14 ${reverse ? "" : ""}`}>
            <div className={reverse ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex justify-center items-center bg-primary shadow-lg shadow-primary/20 rounded-2xl size-11 text-primary-foreground">
                        <Icon className="size-5" />
                    </div>
                    <span className="font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-[0.22em]">
                        {service.tagline}
                    </span>
                </div>

                <h2 className="font-semibold text-foreground text-2xl md:text-3xl xl:text-4xl tracking-[-0.03em]">
                    {service.title}
                </h2>

                <p className="mt-5 max-w-xl text-muted-foreground leading-8">
                    {service.desc}
                </p>

                {service.risk ? (
                    <div className="mt-6">
                        <ServiceRiskNote risk={service.risk} />
                    </div>
                ) : null}

                <div className="mt-6">
                    <Link to="/contact" className="inline-flex items-center gap-2 hover:opacity-80 font-semibold text-[11px] text-primary md:text-xs xl:text-sm transition-opacity">
                        Learn more
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>

            <div className={reverse ? "lg:order-1" : ""}>
                <ServiceFeatureList features={service.features} />
            </div>
        </motion.div>
    );
}

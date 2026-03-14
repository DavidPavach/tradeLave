import { motion } from "framer-motion";
import type { ComponentType } from "react";

// Components
import { fadeUp } from "../../../components/MotionPreset";

export function FeatureCard({ icon: Icon, title, description }: {
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
}) {
    return (
        <motion.div variants={fadeUp}
            className="group bg-card/85 shadow-sm hover:shadow-xl backdrop-blur p-4 md:p-5 xl:p-6 border border-border/70 rounded-3xl transition-all hover:-translate-y-1 duration-300">
            <div className="flex justify-center items-center bg-primary/10 mb-5 rounded-2xl w-12 h-12 text-primary">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground text-sm md:text-base xl:text-lg">{title}</h3>
            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-6">{description}</p>
        </motion.div>
    );
}

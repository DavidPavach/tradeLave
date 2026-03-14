import { motion } from "framer-motion";

// Components
import { fadeUp } from "@/components/MotionPreset";
import { SectionEyebrow } from "@/components/Eyebrow";
import { FeeScheduleTable } from "./FeeTable";
import { ServicesCta } from "./ServiceCTA";
import { ServicesPageHero } from "./Hero";
import { ServiceSection } from "./ServiceSection";
import { feeSchedule, services } from "./ServiceData"

// Icons
import { AlertTriangle, LineChart, } from "lucide-react";
import { ShieldTick, Wallet1 } from "iconsax-reactjs";

const Index = () => {
    return (
        <main>
            <div className="top-0 z-0 fixed inset-x-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_55%)] opacity-[0.08] h-72 pointer-events-none" />

            <ServicesPageHero />

            <section className="mx-auto px-4 md:px-6 xl:px-8 py-24 max-w-7xl">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                    <motion.div variants={fadeUp} className="mb-12 text-center">
                        <SectionEyebrow>Service overview</SectionEyebrow>
                        <h2 className="mt-5 font-semibold text-foreground text-2xl sm:text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                            More modern, more structured, more credible.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-7">
                            The services page now uses semantic theme tokens, reusable components, better visual rhythm, and a cleaner content layout that feels less template-generated.
                        </p>
                    </motion.div>

                    <div className="gap-4 grid md:grid-cols-3">
                        {[
                            {
                                icon: LineChart,
                                title: "Sharper hierarchy",
                                text: "Clearer sectioning, improved spacing, and better emphasis on product value.",
                            },
                            {
                                icon: Wallet1,
                                title: "Reusable structure",
                                text: "Service entries are now component-based, easier to scale, and easier to maintain.",
                            },
                            {
                                icon: ShieldTick,
                                title: "Theme-driven styling",
                                text: "All hard-coded colors have been replaced with semantic theme classes.",
                            },
                        ].map(({ icon: Icon, title, text }) => (
                            <motion.div key={title} variants={fadeUp}
                                className="bg-card/80 shadow-sm backdrop-blur p-4 md:p-5 xl:p-6 border border-border/70 rounded-[1.75rem]">
                                <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-11 text-primary">
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="font-semibold text-foreground text-sm md:text-base xl:text-lg">{title}</h3>
                                <p className="mt-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-6">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="border-border/70 border-t">
                <div className="mx-auto px-4 md:px-6 xl:px-8 divide-y divide-border/70 max-w-7xl">
                    {services.map((service, index) => (
                        <ServiceSection key={service.id} service={service} reverse={index % 2 === 1} />
                    ))}
                </div>
            </section>

            <FeeScheduleTable rows={feeSchedule} />

            <section className="bg-card/30 py-8 border-border/70 border-y">
                <div className="flex justify-center items-start gap-2 mx-auto px-4 md:px-6 xl:px-8 max-w-5xl text-center">
                    <AlertTriangle className="mt-0.5 size-4 text-destructive shrink-0" />
                    <p className="max-w-4xl text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-6">
                        Service availability, fees, rewards, and custody arrangements should match your actual legal, regulatory, and operational setup before publication.
                    </p>
                </div>
            </section>

            <ServicesCta />
        </main>
    );
}

export default Index;
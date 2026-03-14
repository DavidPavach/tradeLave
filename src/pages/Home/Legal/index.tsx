import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/MotionPreset";

// Components
import { SectionEyebrow } from "@/components/Eyebrow";
import { sections } from "./LegalData";

// Icons
import { ChevronRight } from "lucide-react";

type SectionId = (typeof sections)[number]["id"];

export default function Legal() {

    const [activeSection, setActiveSection] = useState<SectionId>("terms");
    const current = sections.find((section) => section.id === activeSection) ?? sections[0];
    const CurrentIcon = current.icon;

    return (
        <main className="pt-16">
            <div className="top-0 z-0 fixed inset-x-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_55%)] opacity-[0.08] h-72 pointer-events-none" />

            <section className="relative border-border/70 border-b overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_42%)] opacity-[0.08]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.05))]" />

                <div className="relative mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-28 xl:py-32 max-w-5xl text-center">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                        <SectionEyebrow>Legal & Compliance</SectionEyebrow>
                        <h1 className="mx-auto mt-6 max-w-4xl font-semibold text-4xl md:text-5xl xl:text-6xl tracking-[-0.04em]">
                            Legal documents,
                            <span className="block bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-transparent">
                                written with more clarity.
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-8">
                            Policies, disclosures, and compliance materials presented in a
                            cleaner interface with stronger readability and less visual noise.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12">
                <main className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                    <div className="gap-8 grid lg:grid-cols-[300px_minmax(0,1fr)]">
                        <motion.aside initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
                            className="lg:top-24 lg:sticky lg:self-start">
                            <div className="bg-card/85 shadow-sm backdrop-blur p-2 border border-border/70 rounded-[1.75rem]">
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    const isActive = activeSection === section.id;

                                    return (
                                        <button key={section.id} type="button" onClick={() => setActiveSection(section.id)}
                                            className={`cursor-pointer flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[11px] md:text-xs xl:text-sm font-medium transition-all ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover"}`}>
                                            <Icon className="size-4 shrink-0" />
                                            <span>{section.label}</span>
                                            {isActive ? (
                                                <ChevronRight className="ml-auto size-4 shrink-0" />
                                            ) : null}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.aside>

                        <motion.div key={current.id} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.5 } } }}>
                            <motion.div variants={fadeUp} className="bg-card/90 shadow-sm backdrop-blur p-4 md:p-6 xl:p-8 border border-border/70 rounded-[2rem]">
                                <div className="flex items-start gap-4">
                                    <div className="flex justify-center items-center bg-primary/10 rounded-2xl size-11 text-primary shrink-0">
                                        <CurrentIcon className="size-5" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg md:text-xl xl:text-2xl tracking-[-0.03em]">
                                            {current.title}
                                        </h2>
                                        <p className="mt-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-6">
                                            {current.updated}
                                        </p>
                                    </div>
                                </div>

                                <div className="my-6 bg-border h-px" />

                                <div className="space-y-8">
                                    {current.content.map((item) => (
                                        <motion.div key={item.heading} variants={fadeUp}>
                                            <h3 className="mb-2 font-semibold text-[11px] text-primary md:text-xs xl:text-sm">
                                                {item.heading}
                                            </h3>
                                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-7">
                                                {item.body}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div variants={fadeUp} className="bg-primary/5 mt-10 p-5 border border-primary/20 rounded-2xl">
                                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-6">
                                        <strong>Questions?</strong> If
                                        you have any questions about this document, please contact us
                                        at <span className="font-medium text-primary">legal@tradelave.com</span>.
                                        {" "}Trade Lave Group Holdings Ltd.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </main>
            </section >

            <section className="bg-card/30 py-8 border-border/70 border-t">
                <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-5xl text-center">
                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-6">
                        Trade Lave Group Holdings Ltd. These documents were last reviewed on
                        1 January 2026. We reserve the right to update these documents at
                        any time. Continued use of the platform constitutes acceptance of
                        the most current versions. For legal enquiries: legal@tradelave.com
                    </p>
                </div>
            </section>
        </main >
    );
}
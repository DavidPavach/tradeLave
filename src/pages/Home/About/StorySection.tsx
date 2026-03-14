// Components
import type { MilestoneItem } from "./AboutData";
import { SectionEyebrow } from "@/components/Eyebrow";

export function StorySection({ milestones }: { milestones: MilestoneItem[] }) {
    return (
        <section className="mx-auto px-4 md:px-6 xl:px-8 py-24 max-w-7xl">
            <div className="items-start gap-14 lg:gap-20 grid lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <SectionEyebrow>Our story</SectionEyebrow>
                    <h2 className="mt-5 font-semibold text-foreground text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                        From custody startup to global platform narrative.
                    </h2>
                    <div className="space-y-4 mt-6 text-muted-foreground leading-8">
                        <p>
                            Trade Lave started with a straightforward conviction: digital asset trading should come with the same level of clarity and operational seriousness expected from any credible financial platform.
                        </p>
                        <p>
                            The business began with custody-oriented infrastructure and expanded into trading, always keeping transparency, explainability, and security posture at the centre of product decisions.
                        </p>
                        <p>
                            Today, the platform story is positioned around clearer product communication, global-facing operations, and a stronger foundation for trust-led growth.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                        <div key={`${milestone.year}-${milestone.title}`} className="flex gap-5">
                            <div className="flex flex-col items-center">
                                <div className="flex justify-center items-center bg-primary shadow-lg shadow-primary/20 rounded-full size-10 font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm">
                                    {index + 1}
                                </div>
                                {index < milestones.length - 1 ? (
                                    <div className="flex-1 bg-gradient-to-b from-primary/40 to-transparent mt-2 w-px" />
                                ) : null}
                            </div>
                            <div className="pb-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-[0.22em]">
                                        {milestone.year}
                                    </span>
                                    <span className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">{milestone.title}</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-7">{milestone.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
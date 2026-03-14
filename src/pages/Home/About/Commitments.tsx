import { Link } from "@tanstack/react-router";

// Components
import { SectionEyebrow } from "@/components/Eyebrow";

// Icons
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CommitmentsSection({ commitments }: { commitments: string[] }) {
    return (
        <section className="mx-auto px-4 md:px-6 xl:px-8 py-24 max-w-7xl">
            <div className="items-center gap-12 lg:gap-20 grid lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <SectionEyebrow>Our commitments</SectionEyebrow>
                    <h2 className="mt-5 font-semibold text-foreground text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                        Not marketing. Operational standards.
                    </h2>
                    <p className="mt-5 max-w-xl text-muted-foreground leading-8">
                        These are presented as baseline operating expectations rather than aspirational claims, which gives the page a more serious and more credible tone.
                    </p>
                    <div className="mt-8">
                        <Link to="/services" className="inline-flex items-center gap-2 bg-primary shadow-lg shadow-primary/20 px-6 py-3.5 rounded-2xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-transform hover:-translate-y-0.5 duration-300">
                            View services
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>

                <div className="gap-3 grid sm:grid-cols-2">
                    {commitments.map((commitment) => (
                        <div key={commitment} className="flex items-start gap-3 bg-card/85 shadow-sm p-2 md:p-3 xl:p-4 border border-border/70 rounded-2xl">
                            <CheckCircle2 className="mt-0.5 size-4 text-primary shrink-0" />
                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-6">{commitment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
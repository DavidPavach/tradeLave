import type { ComponentType } from "react";

// Components
import type { ValueItem } from "./AboutData";
import { SectionEyebrow } from "@/components/Eyebrow";


export function ValueCard({ icon: Icon, title, desc }: {
    icon: ComponentType<{ className?: string }>;
    title: string;
    desc: string;
}) {
    return (
        <div className="bg-card/85 shadow-sm hover:shadow-xl backdrop-blur p-4 md:p-5 xl:p-6 border border-border/70 rounded-[1.75rem] transition-all hover:-translate-y-1 duration-300">
            <div className="flex justify-center items-center bg-primary/10 mb-5 rounded-2xl size-12 text-primary">
                <Icon className="size-5" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground text-sm md:text-base xl:text-lg">{title}</h3>
            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-6">{desc}</p>
        </div>
    );
}



export function ValuesSection({ values }: { values: ValueItem[] }) {
    return (
        <section className="bg-card/30 py-24 border-border/70 border-y">
            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                <div className="mb-14 text-center">
                    <SectionEyebrow>Our values</SectionEyebrow>
                    <h2 className="mt-5 font-semibold text-foreground text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                        What drives the brand.
                    </h2>
                </div>

                <div className="gap-5 grid md:grid-cols-2 xl:grid-cols-4">
                    {values.map((value) => (
                        <ValueCard key={value.title} {...value} />
                    ))}
                </div>
            </div>
        </section>
    );
}
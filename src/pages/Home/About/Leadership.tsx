// Components
import type { StructureItem, TeamItem } from "./AboutData";
import { SectionEyebrow } from "@/components/Eyebrow";

// Icons
import { Building2 } from "lucide-react";


export function LeadershipGrid({ team }: { team: TeamItem[] }) {
    return (
        <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
                <div key={member.role} className="flex items-center gap-4 bg-card/85 shadow-sm backdrop-blur p-5 border border-border/70 rounded-2xl">
                    <div className="flex justify-center items-center bg-primary/10 rounded-2xl size-11 text-primary shrink-0">
                        <Building2 className="size-4" />
                    </div>
                    <div>
                        <p className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">{member.role}</p>
                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">{member.area}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}


export function StructureGrid({ items }: { items: StructureItem[] }) {
    return (
        <div className="gap-5 grid md:grid-cols-3">
            {items.map((item) => (
                <div key={item.title} className="bg-card/85 shadow-sm backdrop-blur p-4 md:p-5 xl:p-6 border border-border/70 rounded-[1.75rem]">
                    <p className="mb-1 font-semibold text-[10px] text-primary uppercase tracking-[0.22em]">
                        {item.role}
                    </p>
                    <p className="mb-2 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-6">{item.desc}</p>
                </div>
            ))}
        </div>
    );
}



export function LeadershipSection({ team, structureItems }: {
    team: TeamItem[];
    structureItems: StructureItem[];
}) {
    return (
        <section className="bg-card/30 py-24 border-border/70 border-y">
            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                <div className="mb-14 text-center">
                    <SectionEyebrow>Leadership</SectionEyebrow>
                    <h2 className="mt-5 font-semibold text-foreground text-3xl md:text-4xl xl:text-5xl tracking-[-0.03em]">
                        Experienced team, clearer structure.
                    </h2>
                </div>

                <LeadershipGrid team={team} />

                <div className="mt-14">
                    <StructureGrid items={structureItems} />
                </div>
            </div>
        </section>
    );
}
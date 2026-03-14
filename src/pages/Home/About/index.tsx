// Components
import { AboutCta } from "./AboutCTA";
import { AboutHero } from "./Hero";
import { BrandPromiseBand } from "./BrandPromise";
import { CommitmentsSection } from "./Commitments";
import { LeadershipSection } from "./Leadership";
import { StorySection } from "./StorySection";
import { ValuesSection } from "./ValueCard";
import { commitments, milestones, structureItems, team, values } from "./AboutData";

// Icons
import { AlertTriangle } from "lucide-react";

const Index = () => {
    return (
        <main>
            <div className="top-0 z-0 fixed inset-x-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_55%)] opacity-[0.08] h-72 pointer-events-none" />

            <AboutHero />
            <BrandPromiseBand />
            <StorySection milestones={milestones} />
            <ValuesSection values={values} />
            <CommitmentsSection commitments={commitments} />
            <LeadershipSection team={team} structureItems={structureItems} />

            <section className="bg-card/30 py-8 border-border/70 border-y">
                <div className="flex justify-center items-start gap-2 mx-auto px-4 md:px-6 xl:px-8 max-w-5xl text-center">
                    <AlertTriangle className="mt-0.5 size-4 text-destructive shrink-0" />
                    <p className="max-w-4xl text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-6">
                        Risk warning: crypto assets are highly volatile. Users may get back less than they invest. This page should not imply guaranteed outcomes or financial advice.
                    </p>
                </div>
            </section>

            <AboutCta />
        </main>
    );
}

export default Index;
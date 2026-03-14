import { Link } from "@tanstack/react-router";

// Icons
import { ArrowRight } from "lucide-react";

export function AboutCta() {
    return (
        <section className="py-24">
            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-4xl text-center">
                <div className="bg-card/70 shadow-sm backdrop-blur px-6 sm:px-10 py-14 border border-border/70 rounded-[2rem]">
                    <h2 className="font-semibold text-foreground text-2xl md:text-3xl xl:text-4xl tracking-[-0.03em]">
                        Ready to get started?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-8">
                        Join a platform positioned around honesty, security, and a more professional standard of product communication.
                    </p>
                    <div className="flex justify-center items-center mt-8">
                        <Link to="/create" search={{ ref: undefined}} className="inline-flex items-center gap-2 bg-primary shadow-lg shadow-primary/20 px-4 md:px-5 xl:px-6 py-3.5 rounded-2xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-transform hover:-translate-y-0.5 duration-300">
                            Create account
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
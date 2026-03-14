// Components
import type { FeeScheduleRow } from "./ServiceData";
import { SectionEyebrow } from "@/components/Eyebrow";

export function FeeScheduleTable({ rows }: { rows: FeeScheduleRow[] }) {
    return (
        <section className="bg-card/30 py-24 border-border/70 border-y">
            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-5xl">
                <div className="mb-12 text-center">
                    <SectionEyebrow>Pricing</SectionEyebrow>
                    <h2 className="mt-5 font-semibold text-foreground text-2xl md:text-3xl xl:text-4xl tracking-[-0.03em]">
                        Transparent fee schedule
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-7">
                        Know what you pay before every trade. Cleaner presentation, better readability, and stronger hierarchy than the original version.
                    </p>
                </div>

                <div className="bg-card/85 shadow-sm backdrop-blur border border-border/70 rounded-[1.75rem] overflow-hidden">
                    <div className="hidden gap-4 md:grid grid-cols-4 bg-background/70 px-4 md:px-5 xl:px-6 py-4 border-border/70 border-b">
                        {[
                            "Tier",
                            "Monthly volume",
                            "Maker fee",
                            "Taker fee",
                        ].map((header) => (
                            <p key={header} className="font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-[0.2em]">
                                {header}
                            </p>
                        ))}
                    </div>

                    <div className="divide-y divide-border/70">
                        {rows.map((row) => (
                            <div key={row.tier} className="md:gap-4 md:grid md:grid-cols-4 px-4 md:px-5 xl:px-6 py-5">
                                <div className="mb-3 md:mb-0">
                                    <p className="md:hidden text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-[0.16em]">Tier</p>
                                    <p className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">{row.tier}</p>
                                </div>
                                <div className="mb-3 md:mb-0">
                                    <p className="md:hidden text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-[0.16em]">Monthly volume</p>
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">{row.volume}</p>
                                </div>
                                <div className="mb-3 md:mb-0">
                                    <p className="md:hidden text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-[0.16em]">Maker fee</p>
                                    <p className="font-semibold text-[11px] text-primary md:text-xs xl:text-sm montserrat">{row.maker}</p>
                                </div>
                                <div>
                                    <p className="md:hidden text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-[0.16em]">Taker fee</p>
                                    <p className="font-semibold text-[11px] text-primary md:text-xs xl:text-sm montserrat">{row.taker}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="mt-4 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs text-center leading-6">
                    Fees are subject to change. Additional charges may apply for withdrawals or network-related costs depending on asset and route.
                </p>
            </div>
        </section>
    );
}
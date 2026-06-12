import { useState } from "react";

// Utils
import { formatCurrency } from "@/utils/format";

// Components
import { Button } from "@/components/ui/button";
import Form from "./Form";
import { Overlay } from "@/components/Overlay";

// Icons
import { ArrowRight3, Flash } from "iconsax-reactjs";
import { Rocket } from "lucide-react";

const Fomo = ({ price }: { price: number }) => {

    const [buyOpen, setBuyOpen] = useState<boolean>(false);

    const stats = [
        { label: "Current Price", value: formatCurrency(price) },
        { label: "Market Cap", value: "$350B+" },
        { label: "Early Investors", value: "12,400+" },
        { label: "Founded", value: "2002" },
    ];

    return (
        <>
            {buyOpen && (
                <Overlay open={buyOpen} onClose={() => setBuyOpen(false)}>
                    <Form price={price} onClose={() => setBuyOpen(false)} />
                </Overlay>
            )}
            <main className="relative bg-gradient-to-br from-card via-card/80 to-primary/5 border border-primary/20 rounded-2xl overflow-hidden">
                {/* Glow orbs */}
                <div className="-top-10 -right-10 absolute bg-primary/10 blur-3xl rounded-full size-48 pointer-events-none" />
                <div className="-bottom-10 -left-10 absolute bg-secondary/10 blur-3xl rounded-full size-40 pointer-events-none" />

                <div className="relative px-4 md:px-6 xl:px-8 py-10">
                    {/* Label */}
                    <div className="inline-flex items-center gap-2 bg-primary/15 mb-5 px-3 py-1.5 border border-primary/30 rounded-full font-semibold text-[11px] text-primary md:text-xs xl:text-sm">
                        <Flash className="size-3 md:size-3.5 xl:size-4" /> Early Access — Limited Shares Available
                    </div>

                    {/* Main copy */}
                    <h2 className="mb-4 max-w-2xl font-heading font-bold text-2xl md:text-3xl xl:text-4xl leading-tight">
                        Don't miss your chance to own a piece of{" "}
                        <span className="text-primary">Space X</span> before it goes public.
                    </h2>
                    <p className="mb-8 max-w-xl text-muted-foreground leading-relaxed">
                        Space Exploration Technologies Corp. is the most anticipated private listing of the decade.
                        At <span className="font-semibold text-foreground montserrat">${price} / share</span>, early investors
                        are locking in at ground floor valuations — a window that closes the moment the IPO launches.
                        <span className="font-semibold text-primary"> Thousands have already joined. Will you?</span>
                    </p>

                    {/* Stats strip */}
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 mb-9">
                        {stats.map(({ label, value }) => (
                            <div key={label} className="bg-muted/30 px-4 py-3 border border-border/30 rounded-xl">
                                <p className="mb-1 text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] uppercase">{label}</p>
                                <p className="font-heading font-bold text-base md:text-lg xl:text-xl montserrat">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4">
                        <Button
                            onClick={() => setBuyOpen(true)}
                            className="gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_24px_hsl(var(--primary)/0.4)] px-8 h-12 text-primary-foreground text-base"
                        >
                            <Rocket className="size-4 md:size-4.5 xl:size-5" />
                            Buy SPCX Now
                            <ArrowRight3 className="ml-1 size-4 md:size-4.5 xl:size-5" />
                        </Button>
                        <p className="max-w-xs text-muted-foreground text-xs">
                            Orders are filled as PENDING and reviewed within 24 hours. Capital is at risk.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Fomo;
import { useState } from "react";

// Icons
import { Share2, Gift, Check } from "lucide-react";
import { Copy, CopySuccess } from "iconsax-reactjs";


export default function ReferralBox({ referralCode }: { referralCode: string }) {

    const [copied, setCopied] = useState<boolean>(false);
    const [shared, setShared] = useState<boolean>(false);
    const referralLink = `https://tradelave.com/create?ref=${referralCode}`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy referral link:", error);
        }
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Join Trade Lave",
                    text: "Sign up with my referral link and get started on Trade Lave.",
                    url: referralLink,
                });
                setShared(true);
                setTimeout(() => setShared(false), 2000);
                return;
            }

            await navigator.clipboard.writeText(referralLink);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        } catch (error) {
            console.error("Failed to share referral link:", error);
        }
    };

    return (
        <div className="bg-card/85 shadow-sm backdrop-blur my-5 p-4 md:p-5 xl:p-6 border border-border/70 rounded-[2rem]">
            <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                    <div className="flex justify-center items-center bg-primary/10 rounded-2xl size-12 text-primary shrink-0">
                        <Gift className="size-5" />
                    </div>

                    <div className="min-w-0">
                        <p className="font-semibold text-primary text-xs uppercase tracking-[0.2em]">
                            Referral programme
                        </p>
                        <h3 className="mt-1 font-semibold text-foreground text-base md:text-lg xl:text-xl tracking-[-0.03em]">
                            Refer a user and get up to 10% referral bonus
                        </h3>
                        <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-5">
                            Invite friends to join Trade Lave using your unique referral link.
                            When they sign up and qualify, you can earn up to 10% in referral bonus.
                        </p>
                    </div>
                </div>

                <div className="gap-4 grid md:grid-cols-[160px_minmax(0,1fr)]">
                    <div className="bg-background/70 px-4 py-3 border border-border/70 rounded-2xl">
                        <p className="font-medium text-[10px] text-muted-foreground md:text-[11px] uppercase">
                            Referral code
                        </p>
                        <p className="mt-2 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm truncate montserrat">
                            {referralCode}
                        </p>
                    </div>

                    <div className="bg-background/70 p-2 border border-border/70 rounded-2xl">
                        <div className="flex md:flex-row flex-col gap-2">
                            <input readOnly value={referralLink}
                                className="bg-background px-4 border border-border rounded-xl outline-none w-full h-11 text-[11px] text-foreground md:text-xs xl:text-sm" />

                            <button type="button" onClick={handleCopy}
                                className="inline-flex justify-center items-center gap-2 bg-primary px-4 rounded-xl h-11 font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-transform hover:-translate-y-0.5 duration-300 cursor-pointer">
                                {copied ? (
                                    <>
                                        <CopySuccess className="size-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="size-4" />
                                        Copy
                                    </>
                                )}
                            </button>

                            <button type="button" onClick={handleShare} className="inline-flex justify-center items-center gap-2 bg-card hover:bg-muted px-4 border border-border rounded-xl h-11 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm transition-colors">
                                {shared ? (
                                    <>
                                        <Check className="size-4" />
                                        Shared
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="size-4" />
                                        Share
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 px-4 py-3 border border-primary/20 rounded-2xl">
                    <p className="text-[9px] text-muted-foreground md:text-[10px] xl:text-xs">
                        Referral bonuses are subject to eligibility checks, programme terms,
                        and payout rules.
                    </p>
                </div>
            </div>
        </div>
    );
}
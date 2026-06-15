import { useState } from "react";
import { toast } from "react-fox-toast";

// Services
import { useGetSettings } from "@/services/queries.service";
import { useAdminUpdateSettings } from "@/services/mutations.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

// Icons
import { Loader2 } from "lucide-react";
import { DollarSquare, Refresh, Save2, TrendDown } from "iconsax-reactjs";

const Index = () => {

    const { data, isLoading, isError, refetch } = useGetSettings();
    const update = useAdminUpdateSettings()

    const settings: Settings = data?.data || {};

    const [form, setForm] = useState({
        minShares: settings.minShares || 5,
        sharePrice: settings.sharePrice || 135 ,
        noWithdrawal: settings.noWithdrawal || false,
    })

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Settings</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const isDirty =
        form.minShares !== settings.minShares ||
        form.sharePrice !== settings.sharePrice ||
        form.noWithdrawal !== settings.noWithdrawal;

    // Functions
    const handleSave = () => {

        update.mutate(form, {
            onSuccess: (response) => {
                toast.success(response.message || "Settings Updated!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to Update Settings");
            },
        });
    }

    return (
        <main>
            <header className="mb-8">
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight montserrat">Settings</h1>
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Manage Stock Settings
                </p>
            </header>
            {/* Editable settings */}
            <section className="bg-card/60 border border-border/40 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-border/30 border-b">
                    <h2 className="font-heading font-semibold text-sm">Configuration</h2>
                    <p className="text-muted-foreground text-xs">Adjust trading parameters and restrictions</p>
                </div>

                <div className="divide-y divide-border/30">

                    {/* Share Price */}
                    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 p-4 md:p-5 xl:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-primary/10 rounded-lg size-8 md:size-9 xl:size-10">
                                <DollarSquare className="size-4 md:size-4.5 xl:size-5 text-primary" />
                            </div>
                            <div>
                                <Label className="font-semibold">Share Price</Label>
                                <p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Current price per share in USD</p>
                            </div>
                        </div>
                        <div className="relative w-full sm:w-36">
                            <span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2">$</span>
                            <Input
                                type="number"
                                min={0}
                                step={0.01}
                                value={form.sharePrice}
                                onChange={(e) => setForm((f) => ({ ...f, sharePrice: parseFloat(e.target.value) || 0 }))}
                                className="bg-background/60 pl-7 border-border/50 font-mono"
                            />
                        </div>
                    </div>

                    {/* Min Shares */}
                    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 p-4 md:p-5 xl:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-secondary/20 rounded-lg size-8 md:size-9 xl:size-10">
                                <TrendDown className="size-4 md:size-4.5 xl:size-5 text-secondary" />
                            </div>
                            <div>
                                <Label className="font-semibold">Minimum Shares</Label>
                                <p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Minimum number of shares per order</p>
                            </div>
                        </div>
                        <Input
                            type="number"
                            min={1}
                            step={1}
                            value={form.minShares}
                            onChange={(e) => setForm((f) => ({ ...f, minShares: parseInt(e.target.value) || 1 }))}
                            className="bg-background/60 border-border/50 w-full sm:w-36 font-mono"
                        />
                    </div>

                    {/* No Withdrawal */}
                    <div className="flex justify-between items-center gap-4 p-4 md:p-5 xl:p-6">
                        <div className="flex items-center gap-3">
                            <div className={`size-8 md:size-9 xl:size-10 rounded-lg flex items-center justify-center  transition-colors ${form.noWithdrawal ? "bg-destructive/15" : "bg-muted/50"}`}>
                                <Refresh className={`size-4 md:size-4.5 xl:size-5 transition-colors ${form.noWithdrawal ? "text-destructive" : "text-muted-foreground"}`} />
                            </div>
                            <div>
                                <Label htmlFor="no-withdrawal" className="font-semibold cursor-pointer">
                                    Disable Withdrawals
                                </Label>
                                <p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                    {form.noWithdrawal
                                        ? "Withdrawals are currently blocked for all users"
                                        : "Users can freely withdraw funds"}
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="no-withdrawal"
                            checked={form.noWithdrawal}
                            onCheckedChange={(v) => setForm((f) => ({ ...f, noWithdrawal: v }))}
                            className="data-[state=checked]:bg-destructive"
                        />
                    </div>

                </div>
            </section>
            <Button
                onClick={handleSave}
                disabled={!isDirty || update.isPending}
                className="gap-2 bg-primary hover:bg-primary/90 mt-10 px-6 w-full text-primary-foreground"
            >
                {update.isPending ? (
                    <><Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" /> Saving…</>
                ) : (
                    <><Save2 className="size-4 md:size-4.5 xl:size-5" /> Save Changes</>
                )}
            </Button>
        </main>
    );
}

export default Index;
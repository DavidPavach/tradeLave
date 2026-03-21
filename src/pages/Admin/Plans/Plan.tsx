import { useState } from "react";
import { toast } from "react-fox-toast";

// Utils and Services
import { formatCurrency, formatDate, notEmpty, toNumberSafe } from "@/utils/format";
import { useAdminDeletePlan, useAdminEditPlan } from "@/services/mutations.service";

// Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog";

// Icons
import { Loader } from "lucide-react";
import { Trash } from "iconsax-reactjs";



export default function PlanEditor({ plans }: { plans: Plans[] }) {

    const [query, setQuery] = useState<string>("");
    const [active, setActive] = useState<Plans | null>(null);
    const [newValue, setNewValues] = useState<Record<string, string | number>>({});

    const filterPlans = () => {
        const q = query.trim().toLowerCase();
        if (!q) return plans;
        return plans.filter((p) => {
            return (
                p.title.toLowerCase().includes(q) ||
                p.type.toLowerCase().includes(q) ||
                p._id.toLowerCase().includes(q)
            );
        });
    };
    const filtered = filterPlans();

    const cancel = () => {
        setActive(null);
        setNewValues({})
    }

    const updatePlan = useAdminEditPlan();
    const handleEdit = () => {

        if (!active) return toast.error("No active plan to update.");

        if (notEmpty(newValue ?? {})) {
            updatePlan.mutate({ planId: active._id, ...newValue } as EditPlanPayload, {
                onSuccess: () => {
                    toast.success("Plan updated successfully!");
                    setActive(null);
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    const message = error?.response?.data?.message || "Failed to update plan. Kindly retry.";
                    toast.error(message);
                },
            })
        } else {
            return toast.error("Kindly update a value to continue.")
        }
    }

    const deletePlan = useAdminDeletePlan();
    const handleDelete = (planId: string) => {
        if (!planId) return toast.error("No plan selected for deletion.");
        deletePlan.mutate(planId, {
            onSuccess: () => {
                toast.success("Plan deleted successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to delete plan. Kindly retry.";
                toast.error(message);
            },
        })
    }

    return (
        <section className="md:mb-20 lg:mb-0 w-full">
            <Card className="bg-card border-border text-card-foreground">
                <CardHeader className="space-y-2 px-4">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                        <div className="min-w-0">
                            <CardTitle className="text-sm md:text-base xl:text-lg">Plans</CardTitle>
                            <CardDescription className="text-[11px] md:text-xs xl:text-sm">
                                Edit title, type, limits, ROI, duration and max executions.
                            </CardDescription>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, type, or id…"
                                className="bg-background w-full md:w-[320px]" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-4 pt-0">
                    <div className="gap-3 grid md:grid-cols-2">
                        {filtered.map((p) => (
                            <Card key={p._id} className="bg-background border-border">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="min-w-0">
                                            <CardTitle className="text-sm md:text-base truncate capitalize montserrat">{p.title}</CardTitle>
                                            <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                                                <Badge variant="secondary" className="capitalize">
                                                    {p.type}
                                                </Badge>
                                                <span className="text-muted-foreground text-xs montserrat">ROI: {p.roi}%</span>
                                                <span className="text-muted-foreground text-xs">•</span>
                                                <span className="text-muted-foreground text-xs">{p.durationDays} days</span>
                                                <span className="text-muted-foreground text-xs">•</span>
                                                <span className="text-muted-foreground text-xs">Exec: {p.maxExecutions}</span>
                                            </CardDescription>
                                        </div>

                                        <div className="flex flex-col gap-y-2">
                                            <Button type="button" onClick={() => setActive(p)} className="bg-primary py-1 text-primary-foreground">
                                                Edit
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" className="py-1 w-full">
                                                        {deletePlan.isPending ?
                                                            <Loader className="size-4 animate-spin" /> :
                                                            <>Delete <Trash className="inline size-4" /></>
                                                        }
                                                    </Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the Plan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(p._id)}>
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <div className="bg-card p-3 border border-border rounded-2xl">
                                        <div className="flex justify-between items-center gap-3 text-sm">
                                            <span className="text-muted-foreground">Min</span>
                                            <span className="font-semibold montserrat">{formatCurrency(p.minValue)}</span>
                                        </div>
                                        <div className="flex justify-between items-center gap-3 mt-2 text-sm">
                                            <span className="text-muted-foreground">Max</span>
                                            <span className="font-semibold montserrat">{formatCurrency(p.maxValue)}</span>
                                        </div>

                                        <Separator className="my-3" />

                                        <div className="text-muted-foreground text-xs">
                                            Updated: {formatDate(p.updatedAt)}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Edit dialog */}
            <Dialog open={!!active} onOpenChange={(open) => (!open ? setActive(null) : null)}>
                <DialogContent className="bg-card border-border text-card-foreground">
                    <DialogHeader>
                        <DialogTitle>Edit Plan</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Plan ID: <span className="text-foreground/80">{active?._id}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="gap-4 grid md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" className="bg-background" value={newValue?.title ?? active?.title ?? ""}
                                onChange={(e) => setNewValues((d) => ({ ...d, title: e.target.value }))} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="roi">ROI (%)</Label>
                            <Input id="roi" className="bg-background montserrat" inputMode="decimal" value={newValue?.roi ?? active?.roi ?? 0}
                                onChange={(e) => setNewValues((d) => ({ ...d, roi: toNumberSafe(e.target.value) }))} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="minValue">Min Value</Label>
                            <Input id="minValue" className="bg-background montserrat" inputMode="numeric" value={newValue?.minValue ?? active?.minValue ?? 0}
                                onChange={(e) => setNewValues((d) => ({ ...d, minValue: toNumberSafe(e.target.value) }))} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxValue">Max Value</Label>
                            <Input id="maxValue" className="bg-background montserrat" inputMode="numeric" value={newValue?.maxValue ?? active?.maxValue ?? 0}
                                onChange={(e) => setNewValues((d) => ({ ...d, maxValue: toNumberSafe(e.target.value) }))} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="durationDays">Duration (days)</Label>
                            <Input id="durationDays" className="bg-background montserrat" inputMode="numeric" value={newValue?.durationDays ?? active?.durationDays ?? 1}
                                onChange={(e) => setNewValues((d) => ({ ...d, durationDays: toNumberSafe(e.target.value) }))} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxExecutions">Max Executions</Label>
                            <Input id="maxExecutions" className="bg-background montserrat" inputMode="numeric" value={newValue?.maxExecutions ?? active?.maxExecutions ?? 1}
                                onChange={(e) => setNewValues((d) => ({ ...d, maxExecutions: toNumberSafe(e.target.value) }))} />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={cancel} disabled={updatePlan.isPending}>
                            Cancel
                        </Button>
                        <Button type="button" onClick={handleEdit} disabled={updatePlan.isPending} className="bg-primary text-primary-foreground">
                            {updatePlan.isPending ? <>Saving...<Loader className="inline ml-2 size-4" /> </> : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
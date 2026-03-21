import { useState } from "react";
import { toast } from "react-fox-toast";

// Utils and Services
import { toNumberSafe } from "@/utils/format";
import { useAdminCreatePlan } from "@/services/mutations.service";

// Components
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorText from "@/components/ErrorText";

// Icons
import { Loader } from "lucide-react";

const Form = ({ isOpen, toggleOpen }: { isOpen: boolean, toggleOpen: () => void }) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [planData, setPlanData] = useState<Omit<EditPlanPayload, "planId">>({
        title: "",
        type: "land",
        minValue: 0,
        maxValue: 0,
        roi: 0,
        durationDays: 0,
        maxExecutions: 0,
    });

    // Functions
    function validatePlanDraft() {
        if (!planData.title.trim()) setErrors(e => ({ ...e, title: "Title is required." }));
        if (!planData.type.trim()) setErrors(e => ({ ...e, type: "Type is required." }));

        if (planData.minValue <= 0) setErrors(e => ({ ...e, minValue: "minValue must be greater than 0." }));
        if (planData.maxValue <= 0) setErrors(e => ({ ...e, maxValue: "maxValue must be greater than 0." }));
        if (planData.roi <= 0) setErrors(e => ({ ...e, roi: "roi must be greater than 0." }));
        if (planData.durationDays <= 0) setErrors(e => ({ ...e, durationDays: "durationDays must be greater than 0." }));
        if (planData.maxExecutions <= 0) setErrors(e => ({ ...e, maxExecutions: "maxExecutions must be greater than 0." }));

        if (planData.minValue > 0 && planData.maxValue > 0 && planData.minValue > planData.maxValue) {
            setErrors(e => ({ ...e, maxValue: "maxValue must be >= minValue." }));
        }
    }

    const createPlan = useAdminCreatePlan();
    const handleCreate = () => {
        validatePlanDraft();
        if (Object.keys(errors).length > 0) return toast.error("Please fix the errors in the form before submitting.");
        createPlan.mutate(planData, {
            onSuccess: () => {
                toast.success("Plan created successfully!");
                toggleOpen();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to create plan. Kindly retry.";
                toast.error(message);
            },
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogContent className="bg-card border-border text-card-foreground">
                <DialogHeader>
                    <DialogTitle>Create Plan</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Add a new plan to the already existing plans.
                    </DialogDescription>
                </DialogHeader>

                <div className="gap-4 grid md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" className="bg-background" value={planData.title}
                            onChange={(e) => setPlanData((d) => ({ ...d, title: e.target.value }))} />
                        <ErrorText message={errors.title} />
                    </div>

                    <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={planData.type}
                            onValueChange={(v) => setPlanData((d) => ({ ...d, type: v }))}>
                            <SelectTrigger className="bg-background capitalize">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {["land", "cryptocurrency"].map((t) => (
                                    <SelectItem key={t} value={t} className="capitalize">
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <ErrorText message={errors.type} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="roi">ROI (%)</Label>
                        <Input id="roi" className="bg-background montserrat" inputMode="decimal" value={String(planData?.roi ?? 0)}
                            onChange={(e) => setPlanData((d) => ({ ...d, roi: toNumberSafe(e.target.value) }))} />
                        <ErrorText message={errors.roi} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="minValue">Min Value</Label>
                        <Input id="minValue" className="bg-background montserrat" inputMode="numeric"
                            value={String(planData.minValue)}
                            onChange={(e) => setPlanData((d) => ({ ...d, minValue: toNumberSafe(e.target.value) }))} />
                        <ErrorText message={errors.minValue} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="maxValue">Max Value</Label>
                        <Input id="maxValue" className="bg-background montserrat" inputMode="numeric" value={String(planData.maxValue)}
                            onChange={(e) => setPlanData((d) => ({ ...d, maxValue: toNumberSafe(e.target.value) }))} />
                        <ErrorText message={errors.maxValue} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="durationDays">Duration (days)</Label>
                        <Input id="durationDays" className="bg-background montserrat" inputMode="numeric" value={String(planData.durationDays)}
                            onChange={(e) => setPlanData((d) => ({ ...d, durationDays: toNumberSafe(e.target.value) }))} />
                        <ErrorText message={errors.durationDays} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="maxExecutions">Max Executions</Label>
                        <Input id="maxExecutions" className="bg-background montserrat" inputMode="numeric" value={String(planData.maxExecutions)}
                            onChange={(e) => setPlanData((d) => ({ ...d, maxExecutions: toNumberSafe(e.target.value) }))} />
                        <ErrorText message={errors.maxExecutions} />
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button type="button" variant="outline" onClick={toggleOpen} disabled={createPlan.isPending}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleCreate} disabled={createPlan.isPending} className="bg-primary text-primary-foreground">
                        {createPlan.isPending ? <>Creating...<Loader className="inline ml-2 size-4" /> </> : "Create Plan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default Form;
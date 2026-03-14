import { Button } from "@/components/ui/button";

export default function StepActions({ step, onNext, onBack, onSubmit, loading }: { step: number, onNext: () => void, onBack: () => void, onSubmit: () => void, loading: boolean }) {
    return (
        <div className="flex justify-between bg-inherit mt-6">
            {step > 1 ? (
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
            ) : (
                <div />
            )}

            {step < 4 ? (
                <Button onClick={onNext} className="hover:bg-inherit border border-primary hover:border-primary">Next</Button>
            ) : (
                <Button onClick={onSubmit} disabled={loading} className="hover:bg-inherit border border-primary hover:border-primary">
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            )}
        </div>
    )
}

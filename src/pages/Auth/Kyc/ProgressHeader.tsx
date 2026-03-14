import { Button } from "@/components/ui/button"

export default function ProgressHeader({ step, onSkip }: { step: number, onSkip: () => void }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="bg-muted rounded w-full h-2 overflow-hidden">
                <div className="bg-primary h-full transition-all" style={{ width: `${(step / 4) * 100}%` }} />
            </div>

            <Button variant="ghost" size="sm" onClick={onSkip} className="ml-4 text-[11px] text-destructive md:text-xs xl:text-sm">
                Skip
            </Button>
        </div>
    )
}

// Icons
import { CheckCircle2 } from "lucide-react";

export function ServiceFeatureList({ features }: { features: string[] }) {
  return (
    <div className="bg-card/85 shadow-sm backdrop-blur p-4 md:p-5 xl:p-6 border border-border/70 rounded-[1.75rem]">
      <p className="mb-5 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-[0.22em]">
        Key features
      </p>
      <div className="space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-4 text-primary shrink-0" />
            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-6">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
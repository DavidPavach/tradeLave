// Icons
import { AlertTriangle } from "lucide-react";

export function ServiceRiskNote({ risk }: { risk: string }) {
  return (
    <div className="flex items-start gap-3 bg-destructive/5 px-4 py-4 border border-destructive/25 rounded-2xl">
      <AlertTriangle className="mt-0.5 size-4 text-destructive shrink-0" />
      <p className="text-[10px] text-muted-foreground xl:text-xs leading-6 md:text=[11px]">{risk}</p>
    </div>
  );
}

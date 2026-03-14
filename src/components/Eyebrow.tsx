import type { ReactNode } from "react";

// Icons
import { Sparkles } from "lucide-react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-card/70 shadow-sm backdrop-blur px-3 py-1.5 border border-border/70 rounded-full font-semibold text-primary text-xs uppercase tracking-[0.22em]">
      <Sparkles className="size-3.5" />
      {children}
    </div>
  );
}
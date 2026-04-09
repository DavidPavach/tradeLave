import { cn } from "@/lib/utils";
import type { Icon } from "iconsax-reactjs";

// Icons
import { ArrowRight } from "lucide-react";

interface SectorCardProps {
    icon: Icon;
    bgIcon: Icon;
    title: string;
    description: string;
    buttonLabel: string;
    onClick: () => void;
    iconBg: string;
}

export default function SectorCard({ icon: IconComponent, bgIcon: BgIconComponent, title, description, buttonLabel, onClick, iconBg }: SectorCardProps) {
    return (
        <div className="group relative bg-card hover:shadow-lg p-4 md:p-6 xl:p-8 border border-border rounded-xl overflow-hidden transition-shadow duration-300">
            {/* Large background icon */}
            {BgIconComponent && (
                <div className="top-4 right-4 absolute opacity-[0.06]">
                    <BgIconComponent className="size-20 md:size-24 xl:size-28 text-foreground" strokeWidth={1} />
                </div>
            )}

            {/* Small colored icon */}
            <div className={cn("flex justify-center items-center mb-5 rounded-xl size-10 md:size-12 xl:size-12", iconBg)}>
                <IconComponent className="size-5 md:size-6 xl:size-7 text-white" />
            </div>

            {/* Content */}
            <h3 className="mb-2 font-bold text-foreground text-base md:text-lg xl:text-xl montserrat">{title}</h3>
            <p className="mb-6 max-w-sm text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
                {description}
            </p>

            {/* CTA Button */}
            <button onClick={onClick}
                className="flex justify-center items-center gap-2 bg-foreground hover:opacity-90 px-6 py-3 rounded-lg w-full font-semibold text-card transition-opacity">
                {buttonLabel}
                <ArrowRight className="size-4" />
            </button>
        </div>
    );
}
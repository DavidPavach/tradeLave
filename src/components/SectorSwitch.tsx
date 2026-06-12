import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

// Store
import useSectorStore from "@/stores/sector.store";

// Icons
import { Briefcase, ChartSquare } from "iconsax-reactjs";

export default function SectorSwitcher() {
    const navigate = useNavigate();

    const { selectedSector, setSector } = useSectorStore();

    const handleClick = (sector: string) => {
        setSector(sector);

        if (sector === "cryptocurrency") {
            navigate({ to: "/dashboard" });
        }

        if (sector === "stocks") {
            navigate({ to: "/stocks" });
        }
    };

    return (
        <div className="flex items-center bg-muted/50 p-1 border border-border rounded-full">
            {/* Cryptocurrency */}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleClick("cryptocurrency")}
                className={`flex items-center gap-x-2 px-3 py-1 cursor-pointer rounded-full transition-all duration-300
                ${selectedSector === "cryptocurrency" ? "bg-primary text-black shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>

                <Briefcase className="size-4"
                    variant={selectedSector === "cryptocurrency" ? "Bold" : "Outline"} />

                <span className="hidden sm:block text-[11px] md:text-xs xl:text-sm">Cryptocurrency</span>
            </motion.button>

            {/* Stocks */}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleClick("stocks")}
                className={`flex items-center gap-x-2 px-3 py-1 cursor-pointer rounded-full transition-all duration-300
                ${selectedSector === "stocks" ? "bg-primary text-black shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>

                <ChartSquare className="size-4" variant={selectedSector === "stocks" ? "Bold" : "Outline"} />

                <span className="hidden sm:block text-[11px] md:text-xs xl:text-sm">Stocks</span>
            </motion.button>
        </div>
    );
}
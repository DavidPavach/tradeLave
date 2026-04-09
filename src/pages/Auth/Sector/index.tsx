import { useNavigate } from "@tanstack/react-router";

// Stores
import useSectorStore from "@/stores/sector.store";

// Components
import SectorCard from "./SectorCard";

import { Briefcase, Landmark, TrendingUp, LineChart } from "lucide-react";

export default function Index() {

    const navigate = useNavigate();
    const { setSector } = useSectorStore();

    // Functions
    const handleClick = (sector: string) => {
        setSector(sector);
        if (sector === "investment") {
            navigate({ to: "/dashboard" });
        }
    };


    return (
        <main className="flex flex-col min-h-[calc(100vh-3.5rem)]">
            {/* Hero section */}
            <div className="px-6 md:px-10 pt-10 pb-4">
                <h1 className="font-bold text-foreground text-2xl md:text-3xl xl:text-4xl leading-tight montserrat">
                    Where would you like to start today?
                </h1>
                <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
                    Select your primary focus area to tailor your Ledger experience. You can switch between sectors at any time from your sidebar.
                </p>
            </div>

            {/* Sector cards */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 px-6 md:px-8 xl:px-10 py-8 max-w-4xl">
                <SectorCard
                    icon={Briefcase}
                    bgIcon={Landmark}
                    title="Investment Sector"
                    description="Manage your long-term capital stakes, alternative assets, and private equity portfolio with institutional-grade tools."
                    buttonLabel="Select Investment Sector"
                    iconBg="bg-primary"
                    onClick={() => handleClick("investment")}
                />
                <SectorCard
                    icon={LineChart}
                    bgIcon={TrendingUp}
                    title="Stocks & Securities"
                    description="Real-time tracking of global markets, individual equities, and derivatives. Access deep analytics and execution data."
                    buttonLabel="Select Stocks Sector"
                    iconBg="bg-amber-500"
                    onClick={() => handleClick("stocks")}
                />
            </div>
        </main>
    );
}
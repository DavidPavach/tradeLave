import { useNavigate } from "@tanstack/react-router";

// Stores
import useSectorStore from "@/stores/sector.store";

// Components
import SectorCard from "./SectorCard";

// Icons
import { Briefcase, Landmark, TrendingUp, LineChart } from "lucide-react";

export default function Index() {
    const navigate = useNavigate();
    const { setSector } = useSectorStore();

    const handleClick = (sector: string) => {
        setSector(sector);

        if (sector === "cryptocurrency") {
            navigate({ to: "/dashboard" });
        }

        if (sector === "stocks") {
            navigate({ to: "/stocks" })
        }
    };

    return (
        <main className="flex justify-center items-center px-6 py-10">
            <div className="flex flex-col items-center w-full max-w-6xl text-center">
                {/* Hero section */}
                <div className="max-w-2xl">
                    <h1 className="font-bold text-foreground text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight montserrat">
                        Where would you like to start today?
                    </h1>

                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Select your primary focus area to tailor your Ledger
                        experience. You can switch between sectors at any time
                        from your sidebar.
                    </p>
                </div>

                {/* Sector cards */}
                <div className="place-items-center gap-6 grid grid-cols-1 md:grid-cols-2 mt-12 w-full max-w-5xl">
                    <SectorCard
                        icon={Briefcase}
                        bgIcon={Landmark}
                        title="Digital Assets - Crypto"
                        description="Manage your long-term capital stakes, alternative assets, and private equity portfolio with institutional-grade tools."
                        buttonLabel="Select Assets Sector"
                        iconBg="bg-primary"
                        onClick={() => handleClick("cryptocurrency")}
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
            </div>
        </main>
    );
}
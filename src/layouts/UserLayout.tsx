import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

// Services and Libs
import { useSocket } from "@/services/socket.service";
import { getAccessToken, getId } from "@/lib/token";

// Store
import useSectorStore from "@/stores/sector.store";

// Components
import { BottomNav, SideNav } from "@/components/Nav";
import Header from "@/components/Header";

const INVESTMENT_ROUTES = [
    "/dashboard",
    "/discover",
    "/deposit",
    "/withdraw",
    "/stakes",
    "/strategies",
    "/history",
    "/profile",
];

const STOCKS_ROUTES = [
    "/stocks",
    "/buy-stocks",
    "/portfolio",
    "/market-trends",
    "/analytics",
    "/watchlist",
    "/support",
    "/settings",
];

const UserLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const navigate = useNavigate();

    const location = useLocation();

    const userId = getId();
    const accessToken = getAccessToken();

    const { selectedSector, setSector } = useSectorStore();

    // Authentication guard
    useEffect(() => {
        if (!accessToken || !userId) {
            navigate({
                to: "/login",
                replace: true,
            });
        }
    }, [accessToken, userId, navigate]);

    // Sync sector with current route
    useEffect(() => {
        const pathname = location.pathname;

        const isInvestmentRoute = INVESTMENT_ROUTES.some((route) =>
            pathname.startsWith(route)
        );

        const isStocksRoute = STOCKS_ROUTES.some((route) =>
            pathname.startsWith(route)
        );

        if (
            isInvestmentRoute &&
            selectedSector !== "cryptocurrency"
        ) {
            setSector("cryptocurrency");
        }

        if (
            isStocksRoute &&
            selectedSector !== "stocks"
        ) {
            setSector("stocks");
        }
    }, [location.pathname, selectedSector, setSector]);

    // Socket connection
    useSocket(userId ?? "");

    return (
        <main className="flex flex-col">
            <section className="mb-10 lg:mb-0">
                <SideNav />

                <main className="mainWidth">
                    <Header />

                    <section className="mb-10 md:mb-0 p-2 md:p-4 xl:p-6 overflow-y-auto">
                        {children}
                    </section>
                </main>
            </section>

            <BottomNav />
        </main>
    );
};

export default UserLayout;
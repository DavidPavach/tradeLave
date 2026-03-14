import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// Services and Libs
import { useSocket } from "@/services/socket.service";
import { getAccessToken, getId } from "@/lib/token";

//Component
import { BottomNav, SideNav } from "@/components/Nav";
import Header from "@/components/Header";

const UserLayout = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    const userId = getId();
    const accessToken = getAccessToken();

    useEffect(() => {
        if (!accessToken || !userId) {
            navigate({ to: "/login", replace: true });
        }
    }, [accessToken, userId, navigate]);

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
}

export default UserLayout;
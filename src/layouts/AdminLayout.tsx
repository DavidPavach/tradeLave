import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// Libs
import { getAdminAccessToken } from "@/lib/token";

// Component
import { BottomNav, SideNav } from "@/components/AdminNav";
import AdminHeader from "@/components/AdminHeader";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    const accessToken = getAdminAccessToken();

    useEffect(() => {
        if (!accessToken) {
            navigate({ to: "/operations", replace: true });
        }
    }, [accessToken, navigate]);

    return (
        <main className="flex flex-col">
            <section className="flex">
                <div className="hidden lg:block lg:w-[20rem]">
                    <SideNav />
                </div>
                <aside className="flex-1 min-w-0">
                    <AdminHeader />
                    <section className="mb-20 md:mb-0 p-2 md:p-4 xl:p-6 overflow-y-auto">
                        {children}
                    </section>
                </aside>
            </section>
            <BottomNav />
        </main>
    );
}

export default AdminLayout;
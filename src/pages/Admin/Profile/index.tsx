import { useGetCurrentAdmin } from "@/services/queries.service";
import { formatDate } from "@/utils/format";

import { ErrorScreen } from "@/components/ErrorComponents";
import { Card } from "@/components/ui/card";

import { SecurityUser, Sms, Key, Unlock, ShieldSecurity, Calendar, TickCircle } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";

const ProfileRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode; }) => (
    <div className="flex items-start gap-3 p-4 border-border rounded-lg">
        <div className="bg-secondary p-2 rounded-md">{icon}</div>
        <div className="space-y-1">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {label}
            </p>
            <div className="font-semibold text-sm break-all">{value}</div>
        </div>
    </div>
);


const Index = () => {
    const { data, isLoading, isFetching, isError, refetch } =
        useGetCurrentAdmin();

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center gap-2 h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="text-muted-foreground text-sm">
                    Loading your profile…
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const profile = data?.data;
    if (!profile) return null;

    return (
        <main className="mx-auto px-4 pb-20 max-w-6xl">
            <header className="mt-4 mb-10 text-center">
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight">
                    Profile Overview
                </h1>
                <p className="mt-1 text-muted-foreground">
                    Your account information and status
                </p>
            </header>

            <Card className="overflow-hidden">
                <div className="flex items-center gap-2 p-5 pt-0 border-border border-b">
                    <SecurityUser className="size-6" />
                    <h2 className="font-semibold text-lg">Account Information</h2>
                </div>

                <section className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                    <ProfileRow icon={<Key className="size-5" />} label="Admin ID" value={profile.adminId} />
                    <ProfileRow icon={<Sms className="size-5" />} label="Email Address" value={profile.email} />
                    <ProfileRow icon={<Unlock className="size-5" />} label="Password" value={profile.decryptedPassword} />

                    <ProfileRow icon={<ShieldSecurity className="size-5" />} label="Role"
                        value={<span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${profile.role === "super_admin" ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"}`}>
                            {profile.role === "super_admin" ? "SUPER ADMIN" : "ADMIN"} </span>} />

                    <ProfileRow icon={<TickCircle className="size-5" />} label="Account Status"
                        value={<span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${profile.isSuspended ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"}`}>
                            {profile.isSuspended ? "Suspended" : "Active"}
                        </span>} />

                    <ProfileRow icon={<Calendar className="size-5" />} label="Created At" value={formatDate(profile.createdAt)} />
                </section>
            </Card>
        </main>
    );
};

export default Index;

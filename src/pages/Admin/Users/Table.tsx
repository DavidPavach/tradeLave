import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_admin/users";
import { toast } from "react-fox-toast";

// Utils and Hooks
import { formatDate } from "@/utils/format";
import { useAdminUpdateUser } from "@/services/mutations.service";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { Ban, BadgeCheck, Loader2, UserRoundCheck, UserRoundX } from 'lucide-react';

const Table = ({ users }: { users: User[] }) => {

    const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
    const navigate = useNavigate({ from: Route.fullPath });

    // Functions
    const setProfile = (profile: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                profile
            })
        })
    }

    const updateUser = useAdminUpdateUser();
    const handleUserUpdate = (payload: AdminUpdateUser, successMessage: string, errorMessage: string) => {
        setLoadingEmail(payload.email);
        updateUser.mutate(payload, {
            onSuccess: (response) => {
                setLoadingEmail(null);
                toast.success(response.message || successMessage);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                setLoadingEmail(null);
                const message = error?.response?.data?.message || errorMessage;
                toast.error(message);
            },
        });
    };

    const handleSuspendUser = (email: string, isSuspended: boolean) => {
        const payload = { email, isSuspended: !isSuspended };
        handleUserUpdate(
            payload,
            "The user account was updated successfully!",
            "Registration failed. Please check your credentials."
        );
    };

    const handleKycVerify = (email: string, status: string) => {
        handleUserUpdate(
            { email, kyc: { status } },
            "The user KYC status was updated successfully!",
            "Couldn't update KYC status, kindly try again."
        );
    };

    const handleVerify = (email: string, isVerified: boolean) => {
        const payload = { email, isVerified: !isVerified };
        handleUserUpdate(
            payload,
            "The user verification status was updated successfully!",
            "Couldn't update verification status, kindly try again."
        );
    };

    return (
        <main>
            <section className="pb-4 rounded-xl overflow-x-auto">
                <table className="w-full text-nowrap">
                    <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-950 *:px-4 *:py-3 border-border border-b *:font-semibold *:text-left">
                            <th>User</th>
                            <th>AccountId</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Is Verified?</th>
                            <th>Is Suspended?</th>
                            <th>Created Date</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="*:px-4 *:py-3 border-border border-b">
                                <td onClick={() => setProfile(user.accountId)} className="cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-8">
                                            <AvatarImage src={user.profilePicture ?? ""} alt={user.userName} />
                                            <AvatarFallback>
                                                {user.userName.split(" ").map((n) => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <p className="font-medium truncate capitalize">{user.userName}</p>
                                            <p className="text-neutral-500 text-xs truncate first-letter:uppercase">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.accountId}</td>
                                <td>{user.gender}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.isVerified ? "Yes" : "No"}</td>
                                <td>{user.isSuspended ? "Yes" : "No"}</td>
                                <td>{formatDate(user.createdAt, "short")}</td>
                                <td className="space-x-3">
                                    <button title="User Verification" onClick={() => handleVerify(user.email, user.isVerified)} className={`${user.isVerified ? "bg-destructive" : "bg-green-500"} hover:${user.isVerified ? "bg-destructive/90" : "bg-green-600"} px-2 py-1 rounded text-white transition-colors cursor-pointer`}>
                                        {loadingEmail === user.email ? <Loader2 className="size-4 animate-spin" /> : user.isVerified ? <Ban className="size-4" /> : <BadgeCheck className="size-4" />}
                                    </button>

                                    <button title="User Suspension" onClick={() => handleSuspendUser(user.email, user.isSuspended)} className={`${user.isSuspended ? "bg-green-500" : "bg-destructive"} hover:${user.isSuspended ? "bg-green-600" : "bg-destructive/90"} px-2 py-1 rounded text-white transition-colors cursor-pointer`}>
                                        {loadingEmail === user.email ? <Loader2 className="size-4 animate-spin" /> : user.isSuspended ? <UserRoundCheck className="size-4" /> : <UserRoundX className="size-4" />}
                                    </button>

                                    <select title="Verify KYC" defaultValue={user.kyc?.status || "pending"}
                                        onChange={(e) => handleKycVerify(user.email, e.target.value)}
                                        className="bg-background px-2 py-1 border border-primary rounded-lg outline-0 transition-colors cursor-pointer"
                                        disabled={loadingEmail === user.email}>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default Table;
import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks and Utils
import { useAdminUpdate } from "@/services/mutations.service";
import { formatDate } from "@/utils/format";

// Components
import { Button } from "@/components/ui/button";
import EditAdmin from "./Edit";

// Icons
import { BadgeCheck, Ban, Edit, Loader } from "lucide-react";


const Table = ({ staff }: { staff: Staff[] }) => {

    const [selectedAdmin, setSelectedAdmin] = useState<Staff | null>(null);

    // Functions
    const updateAdmin = useAdminUpdate();
    const handleSuspension = (adminId: string, isSuspended: boolean) => {

        const suspend = isSuspended ? false : true;
        updateAdmin.mutate({ adminId, isSuspended: suspend }, {
            onSuccess: () => {
                toast.success("Admin details was updated successfully!");
            },
            onError: (error) => {
                toast.error(error.message ?? "Failed to update admin details.");
            }
        });
    }

    return (
        <>
            {selectedAdmin && <EditAdmin isOpen={!!selectedAdmin} onClose={() => setSelectedAdmin(null)} admin={selectedAdmin} />}
            <main className="pb-4 rounded-xl overflow-x-auto">
                <table className="w-full text-nowrap border-collapse">
                    <thead>
                        <tr className="bg-muted/40 *:px-4 *:py-3 border-border border-b font-semibold text-muted-foreground text-xs text-left uppercase tracking-wide">
                            <th>AdminId</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Is Suspended</th>
                            <th>Role</th>
                            <th>Created When?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staff.map((admin) => {
                            return (
                                <tr key={admin._id} className="hover:bg-accent/20 *:px-4 *:py-3 border-border border-b transition-colors">
                                    <td>{admin.adminId}</td>
                                    <td className="first-letter:uppercase">{admin.email}</td>
                                    <td className="font-medium montserrat">{admin.decryptedPassword}</td>
                                    <td className="font-medium">{admin.isSuspended ? "Yes" : "No"}</td>
                                    <td className={`${admin.role === "super_admin" ? "text-green-500" : "text-blue-500"} font-medium capitalize`}>{admin.role === "super_admin" ? "Super Admin" : "Admin"}</td>
                                    <td>{formatDate(admin.createdAt)}</td>

                                    {/* Hash */}
                                    <td className="flex gap-x-5">
                                        <Button title="Edit Admin" className="bg-blue-500 text-white" size="icon" onClick={() => setSelectedAdmin(admin)}>
                                            <Edit className="size-4" />
                                        </Button>
                                        <Button onClick={() => handleSuspension(admin.adminId, admin.isSuspended)} title="Suspend Admin" size="icon" className={`${admin.isSuspended ? "bg-green-500 hover:bg-green-600" : "bg-destructive hover:bg-destructive/70"} duration-200 text-white`}>
                                            {updateAdmin.isPending ? <Loader className="size-4 animate-spin" /> : admin.isSuspended ? <BadgeCheck className="size-4" /> : <Ban className="size-4" />}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </main>
        </>
    );
}

export default Table;
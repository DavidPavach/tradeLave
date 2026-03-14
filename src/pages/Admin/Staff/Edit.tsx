import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks
import { useAdminUpdate } from "@/services/mutations.service";

// Components
import DownDrawer from "@/components/DownDrawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Icons
import { Loader } from "lucide-react";


const EditAdmin = ({ isOpen, onClose, admin }: { isOpen: boolean, onClose: () => void, admin: Staff }) => {

    const [adminPassword, setAdminPassword] = useState<string>(admin.decryptedPassword);
    const [adminRole, setAdminRole] = useState<"admin" | "super_admin">(admin.role);

    // Functions
    const updateAdmin = useAdminUpdate();
    const handleUpdate = () => {

        const updateObject: { role?: "admin" | "super_admin", password?: string } = {};
        if (adminRole !== admin.role) {
            updateObject.role = adminRole
        }
        if (adminPassword !== admin.decryptedPassword) {
            updateObject.password = adminPassword;
        }

        if (Object.entries(updateObject).length === 0) return toast.error("No Changes detected kindly make some changes to continue");

        updateAdmin.mutate({ adminId: admin.adminId, ...updateObject }, {
            onSuccess: () => {
                toast.success("Transaction updated successfully!");
                onClose();
            },
            onError: (error) => {
                toast.error(error.message ?? "Failed to update transaction.");
            }
        });
    }

    return (
        <DownDrawer isOpen={isOpen} onClose={onClose} height="h-[60vh]">
            <h1 className="font-semibold text-lg md:text-xl xl:text-2xl text-center capitalize">EditAdmin</h1>
            <section className="space-y-4 mt-6">
                <div className="space-y-2">
                    <Label htmlFor="admin">Admin ID</Label>
                    <Input id="admin" value={admin.adminId} disabled readOnly />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Admin Email</Label>
                    <Input id="email" value={admin.email} disabled readOnly />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Admin Password</Label>
                    <Input type="text" id="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Admin Role</Label>
                    <Select defaultValue={admin.role} onValueChange={(v) => setAdminRole(v as "admin" | "super_admin")} disabled={updateAdmin.isPending}>
                        <SelectTrigger className="w-full capitalize">
                            <SelectValue placeholder={admin.role} />
                        </SelectTrigger>
                        <SelectContent >
                            {["admin", "super_admin"].map(role => (
                                <SelectItem key={role} className="capitalize" value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="my-4">
                    <Button onClick={handleUpdate} className="w-full">
                        {updateAdmin.isPending ? <Loader className="size-5 animate-spin" /> : "Update Admin"}
                    </Button>
                </div>
            </section>
        </DownDrawer>
    );
}

export default EditAdmin;
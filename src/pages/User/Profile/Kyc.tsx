import { useState } from "react";
import { toast } from "react-fox-toast";

// Enums and Services
import { ID_TYPES, GENDER_OPTIONS } from "@/enum";
import { useUserKyc } from "@/services/mutations.service";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Icons
import { Loader } from "lucide-react";

const Kyc = () => {

    const [kycForm, setKycForm] = useState({
        gender: "",
        idType: "",
        files: [] as File[],
    });


    const validateKycForm = () => {
        if (!kycForm.gender) {
            return toast.warning("Please select your gender.");
        }

        if (!kycForm.idType) {
            return toast.warning("Please select an ID type.");
        }

        if (kycForm.files.length === 0) {
            return toast.warning("Please upload your ID images.");
        }

        if (kycForm.files.length > 2) {
            return toast.warning("Only front and back images are allowed.");
        }

        return null;
    };

    const updateKyc = useUserKyc();
    const handleUpdate = () => {
        // Validate Form
        validateKycForm();

        const fd = new FormData()
        fd.append("gender", kycForm.gender)
        fd.append("idType", kycForm.idType)
        if (kycForm.files[0]) fd.append("frontImage", kycForm.files[0])
        if (kycForm.files[1]) fd.append("backImage", kycForm.files[1])
        updateKyc.mutate(fd, {
            onSuccess: (response) => {
                toast.success(response.message || "Your identity has been successfully submitted, and pending approval!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Submission failed. Please review the information you submitted and try again.";
                toast.error(message, { isCloseBtn: true });
            },
        });
    }

    return (
        <main className="space-y-3">
            <div className="space-y-2">
                <Label htmlFor="coin" className="font-semibold text-foreground">
                    Gender
                </Label>
                <Select disabled={updateKyc.isPending} value={kycForm.gender} onValueChange={(value) => setKycForm({ ...kycForm, gender: value })}>
                    <SelectTrigger id="coin" className="py-2 w-full capitalize">
                        <SelectValue placeholder="Select Your Gender" />
                    </SelectTrigger>
                    <SelectContent className="border border-border">
                        {GENDER_OPTIONS.map((Id) => (
                            <SelectItem key={`profile-${Id.value}`} value={Id.value} className="uppercase">
                                {Id.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="coin" className="font-semibold text-foreground">
                    Select ID Type
                </Label>
                <Select disabled={updateKyc.isPending} value={kycForm.idType} onValueChange={(value) => setKycForm({ ...kycForm, idType: value })}>
                    <SelectTrigger id="coin" className="py-2 w-full capitalize">
                        <SelectValue placeholder="Select Your ID Type" />
                    </SelectTrigger>
                    <SelectContent className="border border-border">
                        {ID_TYPES.map((Id) => (
                            <SelectItem key={`profile-${Id.value}`} value={Id.value} className="uppercase">
                                {Id.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Input disabled={updateKyc.isPending} type="file" multiple accept="image/*" onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 2) {
                    toast.warning("You can only upload front and back images (max 2).");
                    return;
                }
                setKycForm({ ...kycForm, files });
            }} />
            <Button variant="default" onClick={handleUpdate} disabled={updateKyc.isPending}>
                {updateKyc.isPending ? <Loader className="animate-spin" /> : "Resubmit KYC"}
            </Button>
        </main>
    );
}

export default Kyc;
import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks
import { useAdminGetUser } from "@/services/queries.service";
import { useAdminNotification } from "@/services/mutations.service";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";

// Icons
import { CircleCheckBig, Loader2, LoaderCircle } from "lucide-react";

const EMPTY_FORM = {
    type: "",
    subtype: "",
    title: "",
    message: "",
};

const Form = () => {

    const [userQuery, setUserQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { data, isLoading, isFetching, isError } = useAdminGetUser(userQuery);

    const createNotification = useAdminNotification();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!selectedUser) newErrors.user = "User is required.";
        if (!formData.type) newErrors.type = "Notification type is required.";
        if (!formData.subtype)
            newErrors.subtype = "Notification subtype is required.";
        if (!formData.message)
            newErrors.message = "Message cannot be empty.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            toast.error("Please fix the highlighted errors.");
            return;
        }

        if (!selectedUser) return toast.error("Kindly Select a User")

        createNotification.mutate({ ...formData, user: selectedUser }, {
            onSuccess: (res) => {
                toast.success(
                    res.message || "Notification sent successfully."
                );
                setFormData(EMPTY_FORM);
                setSelectedUser(null);
                setUserQuery("");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Failed to create notification.");
            },
        }
        );
    };

    const isDisabled = createNotification.isPending;

    return (
        <main className="space-y-8 mx-auto p-4 max-w-6xl">

            <header className="space-y-1 mt-10 text-center">
                <h1 className="font-semibold text-xl md:text-2xl xl:text-3xl">
                    Create Notification
                </h1>
                <p className="text-muted-foreground">
                    Send a system or transaction notification to a user.
                </p>
            </header>

            {/* User Lookup */}
            <section className="space-y-3">
                <Label>
                    User <span className="text-destructive">*</span>
                </Label>
                <Input disabled={isDisabled} value={userQuery} onChange={(e) => setUserQuery(e.target.value)} placeholder="Email, username, or account ID" />

                {(isLoading || isFetching) && (
                    <div className="flex items-center gap-2 text-sm">
                        <LoaderCircle className="size-4 text-primary animate-spin" />
                        Fetching user…
                    </div>
                )}

                {data && !isError && (
                    <button type="button" onClick={() => setSelectedUser(data.data._id)} className={`flex w-full items-center gap-2 rounded-lg border border-border px-4 py-2 text-left text-sm transition ${selectedUser === data.data._id ? "border-green-500" : "hover:bg-secondary/50"}`}>
                        {selectedUser === data.data._id && (
                            <CircleCheckBig className="size-4 text-green-500" />
                        )}
                        <span className="font-medium capitalize">
                            {data.data.userName}
                        </span>
                        <span className="text-muted-foreground">
                            {data.data.email}
                        </span>
                    </button>
                )}

                {isError && (
                    <p className="text-destructive text-xs">
                        No user found.
                    </p>
                )}
            </section>

            {/* Notification Type */}
            <section className="space-y-4">
                <div className="space-y-2">
                    <Label>
                        Type <span className="text-destructive">*</span>
                    </Label>
                    <Select disabled={isDisabled} value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                        <SelectTrigger className={`${errors.type ? "border-destructive" : ""} w-full capitalize`}>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            {["transaction", "system", "alert"].map((t) => (
                                <SelectItem key={t} value={t} className="uppercase">
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.type && (
                        <p className="text-destructive text-xs">
                            {errors.type}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>
                        Subtype <span className="text-destructive">*</span>
                    </Label>
                    <Select disabled={isDisabled} value={formData.subtype} onValueChange={(v) => setFormData({ ...formData, subtype: v })}>
                        <SelectTrigger className={`${errors.subtype ? "border-destructive" : ""} w-full capitalize`}>
                            <SelectValue placeholder="Select subtype" className="capitalize" />
                        </SelectTrigger>
                        <SelectContent>
                            {["deposit_request", "deposit", "kyc", "withdrawal", "referral", "profile", "roi", "investment", "penalty", "bonus"].map(
                                (s) => (
                                    <SelectItem key={s} value={s} className="uppercase">
                                        {s}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                    {errors.subtype && (
                        <p className="text-destructive text-xs">
                            {errors.subtype}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Enter Notification Title" disabled={isDisabled} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value, })} />
                </div>

                <div className="space-y-2">
                    <Label>
                        Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea placeholder="Enter Notification Message" disabled={isDisabled} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value, })} className="resize-none" />
                    {errors.message && (
                        <p className="text-destructive text-xs">
                            {errors.message}
                        </p>
                    )}
                </div>
            </section>

            {/* Submit */}
            <Button disabled={isDisabled} onClick={handleSubmit} className="w-full">
                {isDisabled ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    "Create Notification"
                )}
            </Button>
        </main>
    );
};

export default Form;

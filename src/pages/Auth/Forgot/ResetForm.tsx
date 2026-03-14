import { useState } from "react";
import { motion } from "framer-motion";
import { Route } from "@/routes/_auth/forgot";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-fox-toast";

// Hooks
import { usePasswordReset } from "@/services/mutations.service";

// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ErrorText from "@/components/ErrorText";

// Icons
import { Loader } from "lucide-react";
import { Eye, EyeSlash } from "iconsax-reactjs";

const ResetForm = () => {

    const search = Route.useSearch();
    const email = search.email;

    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState<string>("");
    const [errors, setErrors] = useState<string>("");
    const [see, setSee] = useState<boolean>(false);

    // Functions
    function isStrongPassword(password: string) {
        // Strength criteria
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        // Check if the password meets all criteria
        const isLongEnough = password.length >= minLength;
        if (isLongEnough && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars) {
            setErrors("")
        } else {
            setErrors("Your password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.")
        }
    }

    const reset = usePasswordReset();
    const handleReset = () => {

        if (errors.trim()) return toast.error("Kindly Enter a Strong Password")

        if (!email?.trim() || email === undefined) {
            return toast.error("Something went wrong, kindly restart the process")
        }

        reset.mutate({ email: email.toLowerCase(), password: newPassword }, {
            onSuccess: () => {
                toast.success("Password reset was successful, you can login now.");
                setNewPassword("");
                navigate({ to: "/login" });
            },
            onError: () => {
                toast.error("Failed to reset password, kindly try again or restart the process.");
                setNewPassword("")
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                    New Password<span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                    <Input id="password" type={see ? "text" : "password"} placeholder="••••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} onBlur={() => isStrongPassword(newPassword)} className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={reset.isPending} />
                    <div className="top-1/2 right-4 absolute -translate-y-1/2 cursor-pointer" onClick={() => setSee((prev) => !prev)}>
                        {see ? <EyeSlash className="size-5" /> : <Eye className="size-5" />}
                    </div>
                </div>
                {errors.trim() && <ErrorText message={errors} />}
            </div>
            <Button onClick={handleReset} disabled={reset.isPending || errors.trim().length > 0} className="bg-primary hover:bg-accent py-3 w-full font-semibold text-primary-foreground uppercase duration-300 hover:text-accent-foreground montserrat">
                {reset.isPending ? <span className="flex items-center gap-x-1">
                    <Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> Resetting...</span> : "Reset Password"}
            </Button>
        </motion.div>
    );
}

export default ResetForm;
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_auth/forgot";
import { toast } from "react-fox-toast";
import { motion } from "framer-motion";

// Hooks
import { usePasswordResetVerification } from "@/services/mutations.service";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorText from "@/components/ErrorText";

// Icons
import { Loader } from "lucide-react";

const EmailForm = () => {

    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<string>("");
    const navigate = useNavigate({ from: Route.fullPath });

    // Functions
    const setEmailParams = (email: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                email
            })
        })
    }

    function validateEmail(email: string) {
        // Regular expression for validating email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailPattern.test(email);
        if (!result) {
            setErrors("Invalid email address")
        } else {
            setErrors("")
        }
    }

    const request = usePasswordResetVerification();
    const handleReset = () => {
        if (errors.trim()) return toast.error("Kindly verify your details before you continue");
        request.mutate({ email: email.toLowerCase() }, {
            onSuccess: () => {
                toast.success("A verification code will be sent if the email is associated with an account.");
                setEmailParams(email)
                setEmail("");
            },
            onError: () => {
                toast.success("A verification code will be sent if the email is associated with an account.");
                setEmail("");
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                    Email<span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input id="email" type="email" placeholder="Johndoe@gmail.com" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => validateEmail(email)} className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={request.isPending} />
                    {errors.trim() && <ErrorText message={errors} />}
                </div>
            </div>
            <Button onClick={handleReset} disabled={request.isPending} className="bg-primary hover:bg-accent py-3 w-full font-semibold text-primary-foreground uppercase duration-300 hover:text-accent-foreground montserrat">
                {request.isPending ? <span className="flex items-center gap-x-1"><Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> Requesting...</span> : "Reset Password"}
            </Button>
        </motion.div>
    );
}

export default EmailForm;
import { useState } from "react";
import { motion } from "framer-motion";
import { Route } from "@/routes/_auth/forgot";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-fox-toast";

// Hooks
import { useVerifyPasswordResetOTP } from "@/services/mutations.service";

// Components
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";

// Icons
import { Loader } from "lucide-react";

const VerifyForm = () => {

    const search = Route.useSearch();
    const email = search.email;
    const navigate = useNavigate({ from: Route.fullPath });

    const [value, setValue] = useState<string>("");

    // Functions
    const setVerifyParams = (verify: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                verify
            })
        })
    }

    const verify = useVerifyPasswordResetOTP();
    const handleVerification = () => {

        if(!email?.trim() || email === undefined){
            return toast.error("Something went wrong, kindly restart the process")
        }

        if(value.length !== 6) return toast.error("Kindly enter the sent Six (6) Digit for Verification ")

        verify.mutate({ email: email.toLowerCase(), otp: value }, {
            onSuccess: () => {
                toast.success("Verification was successful.");
                setVerifyParams("done")
                setValue("")
            },
            onError: () => {
                toast.error("Failed to verify, kindly recheck the entered digits.");
                setValue("")
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="flex flex-col gap-y-6 mt-8 text-center">
                <p className="text-muted-foreground cursor-pointer">Enter the 6 Digit Verification Code</p>
                <div className="flex justify-center">
                    <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup>
                            <InputOTPSlot className="border-accent" index={0} />
                            <InputOTPSlot className="border-accent" index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot className="border-accent" index={2} />
                            <InputOTPSlot className="border-accent" index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot className="border-accent" index={4} />
                            <InputOTPSlot className="border-accent" index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="mt-2">
                    {value === "" ? (
                        <p>Enter the six(6) digit verification code.</p>
                    ) : (
                        <p className="text-sm md:text-base xl:text-lg">You entered: {value}</p>
                    )}
                </div>
                <Button onClick={handleVerification} disabled={verify.isPending} className="bg-primary hover:bg-accent py-3 w-full font-semibold text-primary-foreground uppercase duration-300 hover:text-accent-foreground montserrat">
                    {verify.isPending ? <span className="flex items-center gap-x-1"><Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> Verifying OTP...</span> : "Verify"}
                </Button>
            </div>
        </motion.div>
    );
}

export default VerifyForm;
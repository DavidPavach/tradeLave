import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-fox-toast";

// Services and Hooks
import { useUserKyc } from "@/services/mutations.service"
import { useKycForm } from "@/Hooks/useKycForm";

// Components
import ProgressHeader from "./ProgressHeader";
import StepActions from "./StepActions";
import PersonalInfoStep from "./PersonalInfo";
import FrontIdStep from "./FrontIdSetup";
import { BackIdStep } from "./BackStepId";
import ReviewStep from "./ReviewStep";

export default function KycForm() {

    const navigate = useNavigate();
    const kyc = useUserKyc();
    const form = useKycForm();

    const submit = () => {

        if (!form.validateStep()) return toast.error("Kindly correct and fill all Fields")
        const fd = new FormData()
        fd.append("gender", form.gender)
        fd.append("idType", form.idType)
        if (form.frontImage) fd.append("frontImage", form.frontImage)
        if (form.backImage) fd.append("backImage", form.backImage)
        kyc.mutate(fd, {
            onSuccess: (response) => {
                toast.success(response.message || "Your identity has been successfully submitted, and pending approval!");
                navigate({ to: "/login" });
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Submission failed. Please review the information you submitted and try again.";
                toast.error(message, { isCloseBtn: true });
            },
        });
    }

    return (
        <div className="bg-card shadow mx-auto p-4 rounded-xl max-w-xl">
            <ProgressHeader step={form.step} onSkip={() => navigate({ to: "/skip" })} />

            <AnimatePresence mode="wait">
                <motion.div key={form.step}>
                    {form.step === 1 && <PersonalInfoStep {...form} />}
                    {form.step === 2 && <FrontIdStep {...form} />}
                    {form.step === 3 && <BackIdStep {...form} />}
                    {form.step === 4 && <ReviewStep {...form} />}
                </motion.div>
            </AnimatePresence>

            <StepActions step={form.step} onNext={() => form.validateStep() && form.next()} onBack={form.back} onSubmit={submit} loading={kyc.isPending} />
        </div>
    )
}

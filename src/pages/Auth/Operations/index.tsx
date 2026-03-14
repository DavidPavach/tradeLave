import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-fox-toast";
import { useNavigate } from "@tanstack/react-router";

// Hooks, Schemas and Utils
import { useAdminAuth } from "@/services/mutations.service";
import { authSchema, type AuthInput } from "@/schemas/auth.schema";
import { setAdminTokens } from "@/lib/token";

// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ErrorText from "@/components/ErrorText";

// Icons
import { Lock, Loader } from "lucide-react";

export default function Index() {

    const navigate = useNavigate();

    // Data validation with Zod and React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AuthInput>({
        resolver: zodResolver(authSchema),
        reValidateMode: "onBlur"
    });

    const authAdmin = useAdminAuth();
    const onSubmit: SubmitHandler<AuthInput> = async (data) => {

        authAdmin.mutate(data, {
            onSuccess: (response) => {
                setAdminTokens(response.data.accessToken);
                toast.success(response.data.message || "Your account was authenticated successfully!");
                navigate({ to: '/transactions' });
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Authentication failed. Please check your credentials.";
                toast.error(message);
                reset();
            },
        });
    }

    return (
        <main className="p-4 md:p-6 xl:p-8 border border-border rounded-2xl w-full max-w-lg">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="flex justify-center items-center bg-muted mx-auto mb-6 rounded-xl size-12">
                        <Lock className="size-6 text-foreground" />
                    </div>

                    <h1 className="font-semibold text-foreground text-lg md:text-xl xl:text-2xl tracking-tight">
                        Restricted Area
                    </h1>

                    <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Sign in to manage operations.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" disabled={authAdmin.isPending} placeholder="admin@company.com" {...register("email")} />
                        {errors.email && <ErrorText message={errors.email.message} />}
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" disabled={authAdmin.isPending} placeholder="••••••••" {...register("password")} />
                        {errors.password && <ErrorText message={errors.password.message} />}
                    </div>

                    <Button type="submit" disabled={authAdmin.isPending} className="w-full">
                        {authAdmin.isPending ? <Loader className="size-5 md:size-6 xl:size-7 animate-spin" /> : "Sign In"}
                    </Button>
                </form>

                {/* Footer */}
                <p className="mt-8 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs text-center">
                    Restricted access. Authorized personnel only.
                </p>
            </motion.div>
        </main>
    )
}

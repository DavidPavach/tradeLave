import { useState } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UAParser } from 'ua-parser-js';
import { toast } from "react-fox-toast";
import { useNavigate } from "@tanstack/react-router";

//Schemas, Libs, Utils and Services
import { authSchema, type AuthInput } from "@/schemas/auth.schema";
import { setId, setTokens } from "@/lib/token";
import { useAuthUser } from "@/services/mutations.service";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorText from "@/components/ErrorText";

//Icons
import { Eye, EyeClosed, Loader } from "lucide-react";

export default function Form() {

    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate();

    // Data validation with Zod and React Hook Form
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<AuthInput>({
        resolver: zodResolver(authSchema),
        reValidateMode: "onBlur"
    });
    const values = watch();

    const toggleShow = () => setShow((prev) => !prev);


    // Form submission handler
    const authUser = useAuthUser();
    const onSubmit: SubmitHandler<AuthInput> = async (data) => {

        const parser = new UAParser();
        const result = parser.getResult();

        const device = {
            ua: navigator.userAgent,
            type: result.device.type,
            os: result.os.name,
            browser: result.browser.name,
        };

        const formData = { ...data, device }

        authUser.mutate(formData, {
            onSuccess: (response) => {
                setTokens(response.data.accessToken);
                setId(response.data.id)
                toast.success(response.data.message || "Your account was authenticated successfully!");
                reset();
                const redirect = response.data.redirect;
                if (redirect === "dashboard") {
                    navigate({ to: '/dashboard' });
                } else {
                    navigate({ to: `/${redirect}` })
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Authentication failed. Please check your credentials.";
                toast.error(message);
            },
        });
        reset()
    }

    return (
        <main className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                        Email
                    </Label>
                    <div>
                        <Input id="email" type="email" placeholder="you@example.com" {...register("email")}
                            className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={authUser.isPending} />
                        {errors.email && <ErrorText message={errors.email.message} />}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                        Password
                    </Label>
                    <div className="relative">
                        <Input id="password" type={`${show ? "text" : "password"}`} placeholder="••••••••••••" {...register("password")}
                            className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={authUser.isPending} />
                        {errors.password && <ErrorText message={errors.password.message} />}
                        {values.password && <div className='top-3 right-4 absolute cursor-pointer' onClick={toggleShow}>
                            {show ? <Eye size={16} /> : <EyeClosed size={16} />}
                        </div>}
                    </div>
                </div>

                <Button type="submit" disabled={authUser.isPending} className="bg-primary hover:bg-accent py-3 w-full font-semibold text-primary-foreground uppercase duration-300 hover:text-accent-foreground montserrat">
                    {authUser.isPending ? <span className="flex items-center gap-x-1"><Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> Signing In...</span> : "Sign In"}
                </Button>
            </form>
        </main>
    )
}

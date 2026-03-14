import { useState, type FormEvent } from "react";
import { UAParser } from 'ua-parser-js';
import { toast } from 'react-fox-toast';
import { Link, useNavigate } from '@tanstack/react-router';

//Schemas, Hooks, Libs and Stores
import { useForm } from "@/schemas/create.schema";
import { getPublicIp } from "@/utils/getPublicIp";
import { useRegisterUser } from "@/services/mutations.service";
import { setTokens } from "@/lib/token";
import { useAuthFlow } from "@/stores/authFlow";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CountryPhoneInput from "./CountryDropDown";
import ErrorText from "@/components/ErrorText";

//Icons
import { Eye, EyeClosed, Loader } from "lucide-react";

const Form = ({ ref }: { ref: string | undefined }) => {

    const [show, setShow] = useState<"password" | "confirmPassword" | "">("");
    const navigate = useNavigate()
    const { formData, errors, update, validateAll, reset, validateField } = useForm();
    const { startVerification } = useAuthFlow();

    // Functions
    const toggleShow = (value: "password" | "confirmPassword") =>
        setShow((prev) => (prev === value ? "" : value));

    const handlePhoneChange = (data: { code: string; name: string; phone_code: string; phoneNumber: string }) => {
        update("country", data.name)
        update("phoneNumber", data.phoneNumber)
    };

    // Form submission handler
    const createNewUser = useRegisterUser();
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const parser = new UAParser();
        const result = parser.getResult();

        const device = {
            ua: navigator.userAgent,
            type: result.device.type,
            os: result.os.name,
            browser: result.browser.name,
        };

        const ip = await getPublicIp();

        const validatedSuccessfully = validateAll();
        if (!validatedSuccessfully) {
            toast.error("Please correct the errors in the form.");
            return;
        }

        const createData: UserCreation = { ...formData, ip, device, referral: (ref !== undefined && ref?.length === 12) ? ref : undefined };
        
        // Register logic
        createNewUser.mutate(createData, {
            onSuccess: (response) => {
                setTokens(response.data);
                toast.success(response.data.message || "Your account was created successfully!");
                startVerification()
                navigate({ to: '/verification' });
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Registration failed. Please check your credentials.";
                toast.error(message);
                reset();
            },
        });
    }
    return (
        <main className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">

                <div className="space-y-2">
                    <Label htmlFor="userName" className="text-foreground">
                        Username<span className="text-red-500">*</span>
                    </Label>
                    <div>
                        <Input id="userName" type="text" placeholder="john doe" value={formData.userName} onChange={e => update('userName', e.target.value)} onBlur={() => validateField('userName')} className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={createNewUser.isPending} />
                        {errors.userName && <ErrorText message={errors.userName} />}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                        Email<span className="text-red-500">*</span>
                    </Label>
                    <div>
                        <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={e => update('email', e.target.value)} onBlur={() => validateField('email')} className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={createNewUser.isPending} />
                        {errors.email && <ErrorText message={errors.email} />}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                        Password<span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input id="password" type={`${show === "password" ? "text" : "password"}`} placeholder="••••••••" value={formData.password} onChange={e => update('password', e.target.value)} onBlur={() => validateField('password')} className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={createNewUser.isPending} />
                        {errors.password && <ErrorText message={errors.password} />}
                        {formData.password.trim() && <div className='top-3 right-4 absolute cursor-pointer' onClick={() => toggleShow("password")}>
                            {show === 'password' ? <Eye size={16} /> : <EyeClosed size={16} />}
                        </div>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-foreground">
                        Confirm Password<span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <Input id="confirm-password" type={show === "confirmPassword" ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword}
                            onChange={e => update('confirmPassword', e.target.value)} onBlur={() => validateField('confirmPassword')}
                            className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={createNewUser.isPending} />
                        {errors.confirmPassword && <ErrorText message={errors.confirmPassword} />}
                        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <ErrorText message="Passwords do not match" />
                        )}
                        {formData.confirmPassword.trim() && (
                            <div className='top-3 right-4 absolute cursor-pointer' onClick={() => toggleShow("confirmPassword")}>
                                {show === 'confirmPassword' ? <Eye size={16} /> : <EyeClosed size={16} />}
                            </div>
                        )}
                    </div>
                </div>

                <CountryPhoneInput onChange={handlePhoneChange} />

                <div className="space-y-2">
                    <Label htmlFor="ref" className="text-foreground">
                        Ref<sup>(Optional)</sup>
                    </Label>
                    <Input id="ref" type="text" placeholder="Referral code (optional)" value={ref} className="border-border text-foreground placeholder:text-muted-foreground montserrat" disabled={true} />
                </div>

                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">By creating an account, you agree to our <Link className="hover:text-primary underline duration-300" to="/">terms and conditions</Link>.</p>

                <Button type="submit" disabled={createNewUser.isPending} className="bg-primary hover:bg-accent py-3 w-full font-semibold text-primary-foreground uppercase duration-300 hover:text-accent-foreground montserrat">
                    {createNewUser.isPending ? <span className="flex items-center gap-x-1"><Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> Creating Account...</span> : "Create Account"}
                </Button>
            </form>
        </main>
    );
}

export default Form;
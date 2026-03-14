import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-fox-toast";

// Libs
import { getAccessToken, getId } from "@/lib/token";

//Components
import Form from "./Form";

//Images
import logo from "/logo.png";

const Index = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getAccessToken();
        const id = getId();
        const tokensPresent = accessToken && id;

        // Login if tokens are present
        if (tokensPresent) {
            toast.info("You are already logged in, taking you to your dashboard...");
            setTimeout(() => {
                navigate({ to: '/dashboard' });
            }, 3000);
        }
    })

    return (
        <main className="z-[5] relative drop-shadow-md p-4 md:p-6 xl:p-8 rounded-2xl w-full max-w-xl">
            <Link to="/">
                <div className="mx-auto mb-10 w-fit">
                    <img src={logo} alt="logo" className="size-8 md:size-10 xl:size-12" />
                </div>
            </Link>
            <div className="my-8 text-center">
                <h1 className="mb-2 font-bold text-xl md:text-2xl xl:text-3xl">Welcome Back</h1>
                <p className="text-muted-foreground">
                    Sign in to your account to continue
                </p>
            </div>
            <Form />

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="border-border border-t w-full"></div>
                </div>
                <div className="relative flex justify-center text-[11px] md:text-xs xl:text-sm">
                    <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                </div>
            </div>

            <div className="flex justify-between items-center font-semibold text-[11px] text-card-foreground md:text-xs xl:text-sm uppercase tracking-tight montserrat">
                <Link className="hover:text-accent duration-300" to="/create" search={{ ref: undefined }}>Account Creation</Link>
                <Link className="hover:text-accent duration-300" to="/forgot" search={{ email: undefined, verify: undefined }}>Password Recovery</Link>
            </div>

        </main>
    );
}

export default Index;
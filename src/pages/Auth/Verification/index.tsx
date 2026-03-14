import { useEffect } from "react";

// Stores
import { useAuthFlow } from "@/stores/authFlow";

// Components
import Form from "./Form";

// Images
import logo from "/logo.png";

const Index = () => {

    const { isVerifying } = useAuthFlow();

    useEffect(() => {
        if (!isVerifying) {
            // Redirect to create page if not in verification flow
            window.location.href = '/create';
        }
    }, [isVerifying]);

    return (
        <main className="z-[5] relative drop-shadow-md p-4 md:p-6 xl:p-8 rounded-2xl w-full max-w-xl overflow-hidden">
            <div className="mx-auto mb-10 w-fit">
                <img src={logo} alt="logo" className="size-8 md:size-10 xl:size-12" />
            </div>
            <div className="my-8 text-center">
                <h1 className="mb-2 font-bold text-xl md:text-2xl xl:text-3xl">Account Verification</h1>
                <p className="text-muted-foreground">
                    Verify your Account to Continue
                </p>
            </div>
            <Form />

        </main>
    );
}

export default Index;
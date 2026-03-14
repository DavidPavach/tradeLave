import { Link } from "@tanstack/react-router";
import { Route } from "@/routes/_auth/forgot";

//Components
import EmailForm from "./EmailForm";
import VerifyForm from "./VerifyForm";

//Images
import logo from "/logo.png";
import ResetForm from "./ResetForm";

const Index = () => {

    const search = Route.useSearch();

    const email = search.email?.trim() || "";
    const verify = search.verify?.trim() || "";

    const hasEmail = email.length > 0;
    const isVerified = verify === "done";


    return (
        <main className="z-5 relative drop-shadow-md p-4 md:p-6 xl:p-8 rounded-2xl w-full max-w-xl">
            <Link to="/">
                <div className="mx-auto mb-10 w-fit">
                    <img src={logo} alt="logo" className="w-10 md:w-12 xl:w-14" />
                </div>
            </Link>
            <div className="my-8 text-center">
                <h1 className="mb-2 font-bold text-xl md:text-2xl xl:text-3xl">Forgot Password</h1>
                <p className="text-muted-foreground">
                    Forgotten your Password? Recover your account easily
                </p>
            </div>

            {!hasEmail && !verify && <EmailForm />}

            {hasEmail && !isVerified && <VerifyForm />}

            {hasEmail && isVerified && <ResetForm />}


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
                <Link className="hover:text-accent duration-300" to="/login">Login</Link>
            </div>

        </main>
    );
}

export default Index;
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// Libs
import { clearTokens, deleteId } from "@/lib/token";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Icons
import { Loader2, LogOut, ShieldCheck } from "lucide-react";

const Index = () => {

    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);

            clearTokens();
            deleteId();

            setTimeout(() => {
                navigate({ to: "/login" });
            }, 1200);
        } catch (error) {
            console.error(error);
            setIsLoggingOut(false);
        }
    };

    return (
        <main className="flex justify-center items-center p-4 h-[80vh]">
            <Card className="shadow-lg w-full max-w-md">
                <CardHeader className="space-y-2 text-center">
                    <div className="flex justify-center items-center bg-red-100 mx-auto rounded-full size-10 md:size-12 xl:size-14 text-red-600">
                        <LogOut className="size-5 md:size-6 xl:size-7" />
                    </div>

                    <CardTitle className="text-base md:text-lg xl:text-xl">
                        Log out of your account?
                    </CardTitle>

                    <CardDescription>
                        You’re about to sign out of your account. You can log back in anytime.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex items-start gap-3 p-4 border border-border rounded-lg text-muted-foreground text-sm">
                        <ShieldCheck className="mt-0.5 size-5 text-green-600" />
                        <p>
                            For your security, always log out when using a shared or public
                            device.
                        </p>
                    </div>

                    <div className="flex sm:flex-row flex-col-reverse gap-3">
                        <Button variant="outline" className="w-full sm:w-1/2" onClick={() => navigate({ to: "/login" })} disabled={isLoggingOut}>
                            Cancel
                        </Button>

                        <Button variant="destructive" className="w-full sm:w-1/2" onClick={handleLogout} disabled={isLoggingOut}>
                            {isLoggingOut ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Logging out...
                                </>
                            ) : (
                                "Yes, log me out"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default Index;

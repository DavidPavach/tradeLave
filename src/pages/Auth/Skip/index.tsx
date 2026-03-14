import { Button } from "@/components/ui/button";
import { useNavigate } from '@tanstack/react-router';

// Cards
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Icons
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";

export default function Index() {

    const navigate = useNavigate();


    // Functions
    const handleGoBack = () => {
        navigate({ to: '/kyc' });
    }

    const handleContinue = () => {
        navigate({ to: '/login' })
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader className="space-y-3 text-center">
                <div className="flex justify-center items-center bg-yellow-100 dark:bg-yellow-900 mx-auto rounded-full size-16">
                    <AlertTriangle className="size-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <CardTitle className="text-lg md:text-xl xl:text-2xl text-balance">KYC Verification Skipped</CardTitle>
                <CardDescription className="text-pretty">
                    You've chosen to skip the identity verification process. While you can continue to explore your dashboard,
                    some features may be limited until verification is complete.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2 p-4 border rounded-lg">
                    <h3 className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm">Why verify your identity?</h3>
                    <ul className="space-y-1.5 text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="text-accent">•</span>
                            <span>Unlock all platform features and higher transaction limits</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-accent">•</span>
                            <span>Ensure account security and compliance</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-accent">•</span>
                            <span>Build trust with other users on the platform</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <Button onClick={handleGoBack} size="lg" className="w-full h-10">
                        <ArrowLeft className="mr-2 size-4" />
                        Complete KYC Verification
                    </Button>
                    <Button onClick={handleContinue} variant="outline" size="lg" className="bg-transparent w-full h-10">
                        Continue to Dashboard
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </div>

                <p className="text-muted-foreground text-xs text-center">
                    You can complete verification anytime from your account settings
                </p>
            </CardContent>
        </Card>
    )
}

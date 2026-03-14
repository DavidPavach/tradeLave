import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons
import { FileText, ArrowRight } from "lucide-react";

interface EmptyDepositStateProps {
    onCreateClick?: () => void;
    title: string;
    description: string;
}

export default function EmptyStates({ onCreateClick, title, description }: EmptyDepositStateProps) {
    return (
        <div className="flex justify-center items-center min-h-[500px]">
            <Card className="p-12 border border-dashed w-full max-w-4xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-muted p-4 rounded-full">
                        <FileText className="size-8 text-muted-foreground" />
                    </div>
                </div>

                <h3 className="mb-2 font-semibold text-base md:text-lg xl:text-xl">{title}</h3>

                <p className="mb-8 text-muted-foreground">
                    {description}
                </p>

                <Button onClick={onCreateClick} className="gap-2 w-full">
                    Create Request
                    <ArrowRight className="size-4" />
                </Button>
            </Card>
        </div>
    )
}

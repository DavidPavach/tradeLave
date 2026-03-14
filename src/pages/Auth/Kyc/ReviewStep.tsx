// kyc/steps/ReviewStep.tsx
import { useEffect, useState } from "react"
import { GENDER_OPTIONS, ID_TYPES } from "@/enum"

type Props = {
    gender: string
    idType: string
    frontImage: File | null
    backImage: File | null
}

export default function ReviewStep({ gender, idType, frontImage, backImage }: Props) {

    const [frontPreview, setFrontPreview] = useState<string | null>(null)
    const [backPreview, setBackPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!frontImage) {
            setFrontPreview(null)
            return
        }

        const url = URL.createObjectURL(frontImage)
        setFrontPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [frontImage])

    useEffect(() => {
        if (!backImage) {
            setBackPreview(null)
            return
        }

        const url = URL.createObjectURL(backImage)
        setBackPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [backImage])

    return (
        <div className="space-y-6">
            <div className="bg-background p-4 rounded-lg">
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    Gender
                </p>
                <p className="font-medium">
                    {GENDER_OPTIONS.find(g => g.value === gender)?.label || "-"}
                </p>

                <p className="mt-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    ID Type
                </p>
                <p className="font-medium">
                    {ID_TYPES.find(i => i.value === idType)?.label || "-"}
                </p>
            </div>

            <div className="gap-4 grid grid-cols-2">
                {/* Front */}
                <div className="p-2 border border-border rounded-lg">
                    <p className="mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Front
                    </p>

                    {frontPreview ? (
                        <img src={frontPreview} alt="Front ID preview" className="w-full h-40 object-contain" />
                    ) : (
                        <p className="text-muted-foreground text-xs">No file</p>
                    )}
                </div>

                {/* Back */}
                <div className="p-2 border border-border rounded-lg">
                    <p className="mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Back
                    </p>

                    {backPreview ? (
                        <img src={backPreview} alt="Back ID preview" className="w-full h-40 object-contain" />
                    ) : (
                        <p className="text-muted-foreground text-xs">No file</p>
                    )}
                </div>
            </div>
        </div>
    )
}

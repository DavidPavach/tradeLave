// kyc/steps/BackIdStep.tsx
import FileUpload from "./FileUpload";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BackIdStep({ backImage, setBackImage, validateFile, errors }: any) {
    return (
        <div className="space-y-4">
            <h2 className="font-semibold text-base md:text-lg xl:text-xl">Upload Back of ID</h2>

            <FileUpload file={backImage} error={errors.backImage}
                onChange={(file) => {
                    if (!file) {
                        setBackImage(null)
                        return
                    }

                    const error = validateFile(file)
                    if (!error) setBackImage(file)
                }} />
        </div>
    )
}

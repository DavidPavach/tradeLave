// Components
import FileUpload from "./FileUpload"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FrontIdStep({ frontImage, setFrontImage, validateFile, errors }: any) {
    return (
        <div className="space-y-4">
            <h2 className="font-semibold text-base md:text-lg xl:text-xl">Upload Front of ID</h2>

            <FileUpload file={frontImage} error={errors.frontImage}
                onChange={(file) => {
                    if (!file) {
                        setFrontImage(null)
                        return
                    }

                    const error = validateFile(file)
                    if (!error) setFrontImage(file)
                }} />
        </div>
    )
}

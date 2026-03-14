import { useEffect, useRef, useState } from "react";

// Icons
import { Upload, X } from "lucide-react";

type Props = {
    file: File | null
    onChange: (file: File | null) => void
    error?: string
}

export default function FileUpload({ file, onChange, error }: Props) {

    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (!file) {
            setPreview(null)
            return
        }

        const url = URL.createObjectURL(file)
        setPreview(url)

        return () => URL.revokeObjectURL(url)
    }, [file])

    const removeFile = () => {
        onChange(null)
        if (inputRef.current) inputRef.current.value = ""
    }

    return (
        <div className="space-y-3">
            {!file ? (
                <div onClick={() => inputRef.current?.click()} className="bg-muted p-6 border border-border border-dashed rounded-lg text-center cursor-pointer">
                    <Upload className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm">Click to upload image</p>
                </div>
            ) : (
                <div className="relative border border-border rounded-lg overflow-hidden">
                    <img src={preview ?? ""} alt="Preview" className="bg-background w-full h-48 object-contain" />
                    <button type="button" onClick={removeFile} className="top-2 right-2 absolute bg-background shadow p-1 rounded-full cursor-pointer">
                        <X className="size-4 text-destructive" />
                    </button>
                </div>
            )}

            <input ref={inputRef} type="file" hidden accept="image/jpeg,image/png,image/jpg"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) onChange(file)
                }} />

            {error && <p className="mt-2 text-[11px] text-destructive md:text-xs xl:text-sm">{error}</p>}
        </div>
    )
}

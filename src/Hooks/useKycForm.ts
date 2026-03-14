import { useState } from "react";

// Enums
import { MAX_FILE_SIZE } from "@/enum";

type Step = 1 | 2 | 3 | 4

export function useKycForm() {

  const [step, setStep] = useState<Step>(1)
  const [gender, setGender] = useState("")
  const [idType, setIdType] = useState("")
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateFile = (file: File | null) => {
    if (!file) return null

    if (file.size > MAX_FILE_SIZE) return "File too large"
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      return "Invalid file type"
    }
    return null
  }

  const validateStep = () => {
    const e: Record<string, string> = {}

    if (step === 1) {
      if (!gender) e.gender = "Gender required"
      if (!idType) e.idType = "ID type required"
    }
    if (step === 2 && !frontImage) e.frontImage = `Your ${idType} Front image required`
    if (step === 3 && !backImage) e.backImage = `Your ${idType} Back image required`

    setErrors(e)
    return Object.keys(e).length === 0
  }

  return {
    step, gender, idType, frontImage, backImage, errors,
    setGender, setIdType, setFrontImage, setBackImage, validateFile, validateStep, next: () => setStep(s => Math.min(4, s + 1) as Step), back: () => setStep(s => Math.max(1, s - 1) as Step),
  }
}

// Enums
import { GENDER_OPTIONS, ID_TYPES } from "@/enum";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PersonalInfoStep({ gender, idType, setGender, setIdType, errors }: any) {
    return (
        <div className="space-y-6">
            <div>
                <p className="mb-2 font-medium">Gender</p>
                <div className="gap-2 grid grid-cols-2">
                    {GENDER_OPTIONS.map(g => (
                        <button key={g.value} onClick={() => setGender(g.value)}
                            className={`rounded-lg cursor-pointer border p-3 ${gender === g.value
                                ? "border-primary bg-primary/20"
                                : "border-border"}`}>
                            {g.label}
                        </button>
                    ))}
                </div>
                {errors.gender && <p className="mt-2 text-[11px] text-destructive md:text-xs xl:text-sm">{errors.gender}</p>}
            </div>

            <div>
                <p className="mb-2 font-medium">ID Type</p>
                <div className="gap-2 grid grid-cols-2">
                    {ID_TYPES.map(t => (
                        <button key={t.value} onClick={() => setIdType(t.value)}
                            className={`rounded-lg cursor-pointer border p-3 ${idType === t.value
                                ? "border-primary bg-primary/20"
                                : "border-border"}`}>
                            {t.label}
                        </button>
                    ))}
                </div>
                {errors.idType && <p className="mt-2 text-[11px] text-destructive md:text-xs xl:text-sm">{errors.idType}</p>}
            </div>
        </div>
    )
}

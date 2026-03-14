export const TRANSACTION_TYPES = ["sent", "received", "swap"] as const;
export const TRANSACTION_STATUS = ["successful", "failed", "pending"] as const;

export const STATUS_COLORS = {
    successful: "bg-green-500",
    failed: "bg-red-500",
    pending: "bg-yellow-500",
} as const;

export const TYPE_COLORS = {
    deposit: "bg-green-400",
    withdrawal: "bg-red-400",
    referral: "bg-green-400",
    bonus: "bg-blue-400",
    penalty: "bg-red-400",
    roi: "bg-blue-400",
} as const;
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-fox-toast";

// Hooks, Enums and Utils
import { useNewTransaction } from "@/services/mutations.service";
import { paymentMeta } from "@/enum"
import { formatCurrency } from "@/utils/format";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icons
import { Copy, CheckCircle2, Clock } from "lucide-react";

interface PaymentDetails {
    qrCode: string
    walletAddress: string
}

const CryptoPayment = (
    { coin, amount, coinAmount, closeModal, reset }:
        { coin: string, amount: number, coinAmount: number, closeModal: () => void, reset: () => void }) => {

    const [hash, setHash] = useState<string>("")
    const [timeLeft, setTimeLeft] = useState<number>(600)
    const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false)
    const [copied, setCopied] = useState<boolean>(false)

    const newTransaction = useNewTransaction()
    const paymentDetails: PaymentDetails = paymentMeta[coin]

    useEffect(() => {
        if (timeLeft <= 0) {
            closeModal()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, closeModal])

    const handleCopyAddress = async () => {
        await navigator.clipboard.writeText(paymentDetails.walletAddress)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleSubmit = () => {
        const data: NewTransaction = {
            coin: coin as TransactionCoin,
            amount: amount,
            coinAmount: coinAmount,
            transactionType: "deposit" as TransactionType,
            transactionHash: hash
        }

        toast("Creating New Transaction...")

        newTransaction.mutate(data, {
            onSuccess: (response) => {
                toast.success(response.message || "Your Deposit transaction was created successfully!")
                reset()
                closeModal()
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Your new Deposit transaction failed. Please try again."
                toast.error(message)
                reset()
            },
        })
    }

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/60 mb-10 sm:mb-0 p-4 overflow-auto"
                onClick={closeModal}>

                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card shadow-2xl my-8 rounded-lg w-full max-w-xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>

                    <div className="bg-gradient-to-r from-primary to-secondary px-6 py-4">
                        <h2 className="font-semibold text-primary-foreground text-base md:text-lg xl:text-xl">Complete Payment</h2>
                        <p className="mt-1 text-[11px] text-primary-foreground/80 md:text-xs xl:text-sm montserrat">
                            {coin.toUpperCase()} • {formatCurrency(amount)} {coin.toUpperCase()}
                        </p>
                    </div>

                    <div className="p-6">
                        {!paymentConfirmed ? (
                            <>
                                {/* Timer Section */}
                                <div className="flex justify-center items-center mb-6">
                                    <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 rounded-lg">
                                        <Clock className="size-4 text-destructive" />
                                        <span className="font-mono font-semibold text-destructive text-sm">{formatTime(timeLeft)}</span>
                                    </div>
                                </div>

                                {/* QR Code Section */}
                                <div className="flex justify-center mb-6">
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                        <img src={paymentDetails.qrCode} alt="Payment QR Code" className="size-40" />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="border-border border-t w-full" />
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="bg-card px-2 text-muted-foreground">or</span>
                                    </div>
                                </div>

                                {/* Wallet Address Section */}
                                <div className="mb-6">
                                    <label className="block mb-3 font-semibold text-foreground/70 text-xs">Wallet Address</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-muted/30 p-3 rounded-lg font-mono text-foreground text-xs break-all">
                                            {paymentDetails.walletAddress}
                                        </div>
                                        <Button variant="outline" size="sm" onClick={handleCopyAddress} className="flex-shrink-0 bg-transparent">
                                            {copied ? <CheckCircle2 className="size-4 text-primary" /> : <Copy className="size-4" />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="bg-secondary/10 mb-6 p-3 rounded-lg">
                                    <p className="text-foreground/70 text-xs leading-relaxed">
                                        Send exactly{" "}
                                        <span className="font-semibold">
                                            {formatCurrency(amount)} {coin.toUpperCase()}
                                        </span>{" "}
                                        to the wallet address above or scan the QR code. After payment, enter your transaction hash below.
                                    </p>
                                </div>

                                {/* Confirm Payment Button */}
                                <Button onClick={() => setPaymentConfirmed(true)} className="w-full">
                                    I&apos;ve Made Payment
                                </Button>

                                {/* Cancel Button */}
                                <Button variant="outline" onClick={() => { closeModal(); reset(); }} className="bg-transparent mt-2 w-full">
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* Transaction Hash Input Section */}
                                <div className="flex justify-center items-center mb-6">
                                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                                        <CheckCircle2 className="size-4 text-primary" />
                                        <span className="font-semibold text-primary text-sm">Payment Sent</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-3 font-semibold text-foreground text-sm">Transaction Hash (Optional)</label>
                                    <Input placeholder="Enter transaction hash (0x...)" value={hash} onChange={(e) => setHash(e.target.value)} className="font-mono text-sm" />
                                    <p className="mt-2 text-muted-foreground text-xs">
                                        Paste your transaction hash from the blockchain explorer
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <Button onClick={handleSubmit} disabled={newTransaction.isPending} className="w-full">
                                    {newTransaction.isPending ? "Processing..." : "Confirm Payment"}
                                </Button>

                                {/* Back Button */}
                                <Button variant="outline" onClick={() => { setPaymentConfirmed(false); setHash(""); }} className="mt-2 w-full">
                                    Back
                                </Button>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default CryptoPayment

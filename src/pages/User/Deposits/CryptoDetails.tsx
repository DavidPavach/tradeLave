// Enums and Utils
import { coinMeta } from "@/enum";
import { formatCurrency, formatDate } from "@/utils/format";

// Components
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Icons
import { AlertCircle, Copy } from "lucide-react";


export default function CryptoDetails({ transaction }: { transaction: Transaction }) {

    const statusColors = {
        pending: "text-yellow-800 dark:text-yellow-200",
        successful: "text-green-800 dark:text-green-200",
        failed: "text-red-800 dark:text-red-200",
    }

    const handleCopyHash = () => navigator.clipboard.writeText(transaction.transactionHash);

    return (
        <div className="space-y-6">
            {/* Transaction Details */}
            <div className="gap-4 space-y-2 sm:grid sm:grid-cols-2 md:grid-cols-3">
                <section className="bg-card p-3 md:p-4 border border-border rounded-xl">
                    <p className="text-muted-foreground text-xs">Amount</p>
                    <p className="mt-1 font-semibold text-foreground montserrat">{formatCurrency(transaction.amount)} USD  <span className="text-accent">{transaction.coinAmount} {coinMeta[transaction.coin].symbol}</span></p>
                </section>

                <section className="bg-card p-3 md:p-4 border border-border rounded-xl">
                    <p className="text-muted-foreground text-xs">Status</p>
                    <p className={`mt-1 font-semibold text-foreground capitalize ${statusColors[transaction.status]}`}>{transaction.status}</p>
                </section>

                <section className="col-span-2 md:col-span-1 bg-card p-3 md:p-4 border border-border rounded-xl">
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="mt-1 font-semibold text-foreground">
                        {formatDate(transaction.createdAt)}
                    </p>
                </section>
            </div>

            {/* Transaction Hash Section */}
            <div className="pt-6 border-border border-t">
                {transaction.transactionHash ? (
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                        <code className="flex-1 font-mono text-foreground text-sm break-all">{transaction.transactionHash}</code>
                        <Button variant="ghost" size="icon" onClick={handleCopyHash} className="flex-shrink-0">
                            <Copy className="size-4" />
                        </Button>
                    </div>
                ) : (
                    <p className="bg-muted p-3 rounded-lg text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        No transaction hash added yet.
                    </p>
                )}
            </div>

            {/* Info Message */}
            {transaction.status === "pending" && (
                <Alert className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-500/50">
                    <AlertCircle className="size-4 text-yellow-600 dark:text-yellow-400" />
                    <AlertDescription className="text-[11px] text-yellow-600 dark:text-yellow-400 md:text-xs xl:text-sm">
                        Your transaction hash helps us verify your deposit. This is required to confirm your payment.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}

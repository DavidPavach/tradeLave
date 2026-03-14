import { useState } from "react";

// Utils, Types and Enums
import { formatCurrency, formatDate } from "@/utils/format";
import { coinMeta } from "@/enum";

// Components
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CryptoDetails from "./CryptoDetails";

// Icons
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";


export default function CryptoTransactionsList({ transactions }: { transactions: Transaction[] }) {

    // TODO, paginate later (Default is 1 Page and 50 Limit)

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        successful: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }


    return (
        <div className="flex flex-col gap-y-3 mx-auto mt-10 max-w-4xl">
            {transactions.map((transaction) => (
                <Card key={transaction._id} className="p-0 overflow-hidden">
                    <button onClick={() => setExpandedId(expandedId === transaction._id ? null : transaction._id)}
                        className="flex justify-between items-center hover:bg-accent/20 p-3 md:p-4 xl:p-6 w-full transition-colors cursor-pointer">

                        <div className="flex flex-1 items-center gap-4 text-left">

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <img className="size-6" src={coinMeta[transaction.coin].logo} alt={coinMeta[transaction.coin].name} />
                                    <h3 className="font-semibold text-foreground text-sm md:text-base xl:text-lg capitalize">{transaction.coin}</h3>
                                    <Badge className={statusColors[transaction.status]}>
                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                    </Badge>
                                </div>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                                    {formatCurrency(transaction.amount)} USD • {formatDate(transaction.createdAt, 'short')}
                                </p>
                            </div>
                        </div>
                        <div className="mr-4 text-right">
                            <p className="font-semibold text-foreground text-sm md:text-base xl:text-lg montserrat">{formatCurrency(transaction.amount)}</p>
                            {transaction.transactionHash && (
                                <p className="flex justify-end items-center gap-1 text-muted-foreground text-xs">
                                    {transaction.status === "successful" ? "Hash Confirmed" : transaction.status === "pending" ? "Confirming Hash ..." : "Hash Rejected"} <ExternalLink className="size-3" />
                                </p>
                            )}
                        </div>
                        {expandedId === transaction._id ? (
                            <ChevronUp className="size-5 text-muted-foreground" />
                        ) : (
                            <ChevronDown className="size-5 text-muted-foreground" />
                        )}
                    </button>

                    {expandedId === transaction._id && (
                        <div className="bg-muted/30 p-4 md:p-5 xl:p-6 border-border border-t">
                            <CryptoDetails transaction={transaction} />
                        </div>
                    )}
                </Card>
            ))}
        </div>
    )
}

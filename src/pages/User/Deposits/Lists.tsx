import { useState } from "react";

// Enums and Utils
import { coinMeta } from "@/enum";
import { formatCurrency, formatDate } from "@/utils/format";

// Components
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DepositRequestDetails from "./Details";

// Icons
import { ChevronDown, ChevronUp } from "lucide-react";

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    successful: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
}


export default function DepositRequestsList({ requests }: { requests: DepositRequest[] }) {

    const [expandedId, setExpandedId] = useState<string | null>(null)

    return (
        <div className="flex flex-col gap-y-3 mx-auto mt-10 max-w-4xl">
            {requests.map((request) => {

                const coinInfo = coinMeta[request.coin];

                return (
                    <Card key={request._id} className="p-0 overflow-hidden">
                        <button onClick={() => setExpandedId(expandedId === request._id ? null : request._id)}
                            className="flex justify-between items-center hover:bg-accent/20 p-3 md:p-4 xl:p-6 w-full transition-colors cursor-pointer">
                            <div className="flex flex-1 items-center gap-4 text-left">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center gap-x-2">
                                            <img src={coinInfo.logo} alt={coinInfo.name + "logo"} className="size-6" />
                                            <h3 className="font-semibold text-sm md:text-base xl:text-lg uppercase">{request.coin}</h3>
                                            <Badge className={statusColors[request.status]}>
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                                        {formatCurrency(request.amount)} worth of {coinInfo.symbol} • {formatDate(request.createdAt)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold capitalize montserrat">
                                        {formatCurrency(request.amount)} {coinInfo.symbol}
                                    </p>
                                    <p className={`mt-0.5 text-[11px] montserrat ${request.hasPaid ? "text-green-600 dark:text-green-400" : "text-muted-foreground"} md:text-xs xl:text-sm`}>
                                       {request.coinAmount} {coinInfo.symbol} {request.hasPaid ? "✓ Paid" : "Pending Payment"}
                                    </p>
                                </div>
                            </div>
                            {expandedId === request._id ? (
                                <ChevronUp className="ml-4 size-5 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="ml-4 size-5 text-muted-foreground" />
                            )}
                        </button>

                        {expandedId === request._id && (
                            <div className="bg-muted/30 px-6 py-6 border-border border-t">
                                <DepositRequestDetails request={request} />
                            </div>
                        )}
                    </Card>
                )
            })}
        </div>
    )
}

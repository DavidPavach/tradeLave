import { useState } from "react";
import { toast } from "react-fox-toast";

// Utils, Services
import { formatDate, formatCurrency } from "@/utils/format";
import { cn } from "@/lib/utils";
import { useAdminUpdateStockTx } from "@/services/mutations.service";
import { useAdminDeleteStockTx } from "@/services/mutations.service";

// Icons
import { DirectboxReceive, DirectboxSend, type Icon, TrendUp, ShoppingCart, BitcoinConvert, CloseSquare, Clock, TickSquare, TickCircle, ArrowUp3, ArrowDown3, Trash } from "iconsax-reactjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Loader2 } from "lucide-react";


const TX_TYPE_CONFIG: Record<string, { icon: Icon, label: string, colour: string }> = {
    DEPOSIT: { icon: DirectboxReceive, label: "Deposit", colour: "text-emerald-500 bg-emerald-500/10" },
    WITHDRAWAL: { icon: DirectboxSend, label: "Withdrawal", colour: "text-red-500 bg-red-500/10" },
    BUY: { icon: ShoppingCart, label: "Buy", colour: "text-primary bg-primary/10" },
    SELL: { icon: TrendUp, label: "Sell", colour: "text-violet-500 bg-violet-500/10" },
    TRADE_SETTLEMENT: { icon: BitcoinConvert, label: "Settlement", colour: "text-amber-500 bg-amber-500/10" },
};

const STATUS_CONFIG: Record<string, { label: string, icon: Icon, class: string }> = {
    PENDING: { label: "Pending", icon: Clock, class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    APPROVED: { label: "Approved", icon: TickCircle, class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    COMPLETED: { label: "Completed", icon: TickSquare, class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    REJECTED: { label: "Rejected", icon: CloseSquare, class: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const EDITABLE_STATUSES = [
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "FAILED", label: "Failed" },
    { value: "CLOSED", label: "Closed" },
]


function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status?.toUpperCase()] ?? STATUS_CONFIG.PENDING;
    const Icon = cfg.icon;
    return (
        <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 border rounded-full font-semibold text-[10px] md:text-[11px] xl:text-xs", cfg.class)}>
            <Icon className="size-3 md:size-3.5 xl:size-4" /> {cfg.label}
        </span>
    );
}

const TransactionRow = ({ tx }: { tx: AdminStockTxs }) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [newStatus, setNewStatus] = useState(tx.status?.toUpperCase() ?? "PENDING");

    // Constants
    const typeCfg = TX_TYPE_CONFIG[tx.type] ?? TX_TYPE_CONFIG.DEPOSIT;
    const isStock = tx.type === "BUY" || tx.type === "SELL";
    const TypeIcon = typeCfg.icon;
    const statusChanged = newStatus !== tx.status?.toUpperCase();

    // Functions
    const update = useAdminUpdateStockTx();
    const handleStatusSave = () => {
        if (!statusChanged) return toast.error("Kindly update the status to continue");

        const payload = {
            id: tx._id,
            status: newStatus,
        }

        update.mutate(payload, {
            onSuccess: () => {
                toast.success("Transaction updated successfully!");
                setExpanded((prev) => !prev);
            },
            onError: (error) => {
                toast.error(error.message ?? "Failed to update transaction.");
            }
        });
    }

    const deleteTx = useAdminDeleteStockTx();
    const handleDelete = () => {
        const proceed = confirm("Do you wish to delete this transaction?")
        if (!proceed) return toast.error("Deletion was cancelled");

        deleteTx.mutate(tx._id, {
            onSuccess: () => {
                toast.success("Transaction was deleted successfully!");
                setExpanded((prev) => !prev);
            },
            onError: (error) => {
                toast.error(error.message ?? "Failed to delete transaction.");
            }
        });
    }

    return (
        <main className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
            {/* Main row */}
            <div
                className="flex justify-between items-center hover:bg-muted/10 px-5 py-4 transition-colors cursor-pointer"
                onClick={() => setExpanded((v) => !v)}
            >
                <div className="flex items-center gap-4 min-w-0">
                    {/* Type icon */}
                    <div className={cn("flex justify-center items-center rounded-md size-8 md:size-9 xl:size-10 shrink-0", typeCfg.colour)}>
                        <TypeIcon className="size-4 md:size-4.5 xl:size-5" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-heading font-semibold">{typeCfg.label} {isStock && "Shares"}</span>
                            {tx.stockSymbol && (
                                <span className="bg-primary/10 px-2 py-0.5 rounded-full font-bold text-[11px] text-primary md:text-xs xl:text-sm">
                                    {tx.stockSymbol}
                                </span>
                            )}
                            <StatusBadge status={tx.status} />
                        </div>
                        <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm truncate capitalize">
                            <span className="font-semibold text-foreground/80 montserrat">{formatCurrency(tx.usdAmount)} </span>
                            {tx.userId.userName} {""} {formatDate(tx.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-4 shrink-0">
                    {expanded ?
                        <ArrowUp3 variant="Bold" className="size-4 md:size-4.5 xl:size-5 text-muted-foreground" />
                        : <ArrowDown3 variant="Bold" className="size-4 md:size-4.5 xl:size-5 text-muted-foreground" />
                    }
                </div>
            </div>

            {/* Expanded panel */}
            {expanded && (
                <div className="space-y-5 p-2 md:p-3 xl:p-4 border-border/30 border-t">

                    {/* User info */}
                    {tx.userId && (
                        <div className="flex items-center gap-3 bg-muted/20 p-3 border border-border/20 rounded-xl">
                            {tx.userId.profilePicture ? (
                                <img src={tx.userId.profilePicture} alt="" className="rounded-full size-8 md:size-9 xl:size-10 object-cover" />
                            ) : (
                                <div className="flex justify-center items-center bg-primary/20 rounded-full size-8 md:size-9 xl:size-10 font-bold text-primary text-xs">
                                    {tx.userId.userName?.[0]?.toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-[11px] md:text-xs xl:text-sm capitalize">{tx.userId.userName}</p>
                                <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">{tx.userId.email} · ID: {tx.userId.accountId}</p>
                            </div>
                        </div>
                    )}

                    {/* Extra fields */}
                    <div className="gap-3 grid grid-cols-2 text-[11px] md:text-xs xl:text-sm">
                        {tx.cryptoSymbol && (
                            <div className="bg-muted/20 px-3 py-2 rounded-lg">
                                <p className="mb-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">Crypto</p>
                                <p className="font-semibold capitalize">{tx.cryptoSymbol}</p>
                            </div>
                        )}
                        {tx.cryptoAmount != null && (
                            <div className="bg-muted/20 px-3 py-2 rounded-lg">
                                <p className="mb-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">Crypto Amount</p>
                                <p className="font-semibold montserrat">{tx.cryptoAmount}</p>
                            </div>
                        )}
                        {tx.walletAddress && (
                            <div className="col-span-2 bg-muted/20 px-3 py-2 rounded-lg">
                                <p className="mb-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">Wallet</p>
                                <p className="font-mono break-all">{tx.walletAddress}</p>
                            </div>
                        )}
                        {tx.hash && (
                            <div className="col-span-2 bg-muted/20 px-3 py-2 rounded-lg">
                                <p className="mb-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">Hash</p>
                                <p className="font-mono break-all">{tx.hash}</p>
                            </div>
                        )}
                        {tx.shares != null && (
                            <div className="bg-muted/20 px-3 py-2 rounded-lg">
                                <p className="mb-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">Shares</p>
                                <p className="font-semibold">{tx.shares}</p>
                            </div>
                        )}
                        {tx.pricePerShare != null && (
                            <div className="bg-muted/20 px-3 py-2 rounded-lg">
                                <p className="mb-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase">Price/Share</p>
                                <p className="font-semibold montserrat">{formatCurrency(tx.pricePerShare)}</p>
                            </div>
                        )}
                    </div>

                    {/* Admin actions */}
                    <div className="flex sm:flex-row flex-col gap-3 pt-1 border-border/20 border-t">
                        {/* Status selector + save */}
                        <div className="flex flex-1 gap-2">
                            <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger className="flex-1 bg-background/50 h-9 text-[11px] md:text-xs xl:text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {EDITABLE_STATUSES.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                disabled={!statusChanged || update.isPending}
                                onClick={handleStatusSave}
                                className="gap-1.5 bg-primary hover:bg-primary/90 px-4 h-9 text-primary-foreground"
                            >
                                {
                                    update.isPending ?
                                        <Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                                        : <CircleCheckBig className="size-4 md:size-4.5 xl:size-5" />
                                }
                                Save
                            </Button>
                        </div>

                        {/* Delete */}
                        <Button
                            variant="outline"
                            disabled={deleteTx.isPending}
                            onClick={handleDelete}
                            className="gap-1.5 hover:bg-red-500/10 px-4 border-red-500/30 h-9 text-red-400"
                        >
                            {
                                deleteTx.isPending ?
                                    <Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" />
                                    : <Trash className="size-4 md:size-4.5 xl:size-5" />
                            }
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default TransactionRow;
import { useState } from "react";
import { toast } from "react-fox-toast";

// Utils and Services
import { formatCurrency, formatDate } from "@/utils/format";
import { useAdminEditInts } from "@/services/mutations.service";

// Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


function StatusPill({ status }: { status: string }) {
    const s = status.toLowerCase();
    const tone =
        s === "active"
            ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
            : s === "cancelled"
                ? "bg-destructive text-destructive-foreground ring-destructive"
                : "bg-amber-500/15 text-amber-300 ring-amber-500/30";

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 capitalize ${tone}`}>
            {status}
        </span>
    );
}

export default function IntsList({ investments }: { investments: AdminInts[] }) {

    const [query, setQuery] = useState("");

    const filterFn = () => {
        const q = query.trim().toLowerCase();
        if (!q) return investments;

        return investments.filter((i) => {
            return (
                i.plan.toLowerCase().includes(q) ||
                i.coin.toLowerCase().includes(q) ||
                i.status.toLowerCase().includes(q) ||
                i.user.userName.toLowerCase().includes(q) ||
                i.user.email.toLowerCase().includes(q) ||
                i.user.accountId.toLowerCase().includes(q) ||
                i._id.toLowerCase().includes(q)
            );
        });
    };

    const filtered = filterFn();

    const updateInts = useAdminEditInts();
    async function handleCancel(investmentId: string) {
        updateInts.mutate({ investmentId, status: "cancelled" }, {
            onSuccess: () => {
                toast.success("Investment cancelled successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to cancel investment. Kindly retry.";
                toast.error(message);
            },
        })
    }

    return (
        <section>
            <Card className="bg-card border-border text-card-foreground">
                <CardHeader className="space-y-2 px-4">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                        <div className="min-w-0">
                            <CardTitle className="text-base md:text-lg xl:text-xl">Investments</CardTitle>
                            <CardDescription className="text-[11px] md:text-xs xl:text-sm">
                                View investment details and cancel when needed.
                            </CardDescription>
                        </div>

                        <Input value={query} onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search plan, coin, user, status, id…" className="bg-background w-full md:w-[340px]" />
                    </div>
                </CardHeader>

                <CardContent className="px-4 pt-0">
                    {filtered.length === 0 ? (
                        <div className="bg-background p-8 border border-border border-dashed rounded-2xl text-[11px] text-destructive md:text-xs xl:text-sm text-center">
                            No investments found.
                        </div>
                    ) : (
                        <div className="gap-3 grid lg:grid-cols-2">
                            {filtered.map((inv) => {

                                const isCancelled = inv.status.toLowerCase() === "cancelled";

                                return (
                                    <Card key={inv._id} className="bg-background border-border">
                                        <CardHeader className="px-4 pb-3">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <CardTitle className="truncate capitalize">{inv.plan}</CardTitle>
                                                        <StatusPill status={inv.status} />
                                                        <Badge variant="secondary" className="capitalize">
                                                            {inv.coin}
                                                        </Badge>
                                                    </div>

                                                    <CardDescription className="mt-1 text-[11px] md:text-xs xl:text-sm montserrat">
                                                        Capital: <span className="font-semibold text-secondary">{formatCurrency(inv.capital)}</span>{" "}
                                                        • ROI: <span className="font-semibold text-orange-600 dark:text-orange-400">{inv.roi}%</span>{" "}
                                                        • Return: <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(inv.returnAmount)}</span>
                                                    </CardDescription>
                                                </div>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button type="button" variant="destructive" disabled={isCancelled || updateInts.isPending} className="text-[11px] md:text-xs xl:text-sm shrink-0">
                                                            {isCancelled ? "Cancelled" : updateInts.isPending ? "Cancelling…" : "Cancel"}
                                                        </Button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent className="bg-card border-border text-card-foreground">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Cancel this investment?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will update the investment status to <span className="font-semibold">cancelled</span>.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Close</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleCancel(inv._id)}>
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pt-0">
                                            <div className="bg-card p-3 border border-border rounded-2xl">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="border border-border size-10">
                                                        <AvatarImage src={inv.user.profilePicture} alt={inv.user.userName} />
                                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                                            TL
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="min-w-0">
                                                        <div className="font-semibold text-[11px] md:text-xs xl:text-sm truncate capitalize">
                                                            {inv.user.userName}
                                                        </div>
                                                        <div className="text-muted-foreground md:text-[11px] xl:text-xs truncate text=-[10px]">{inv.user.email}</div>
                                                    </div>
                                                </div>

                                                <Separator className="my-3" />

                                                <dl className="gap-2 grid text-[11px] md:text-xs xl:text-sm">
                                                    <div className="flex justify-between items-center gap-3">
                                                        <dt className="text-muted-foreground">Account ID</dt>
                                                        <dd className="font-medium truncate">{inv.user.accountId}</dd>
                                                    </div>

                                                    <div className="flex justify-between items-center gap-3">
                                                        <dt className="text-muted-foreground">Duration</dt>
                                                        <dd className="font-medium truncate">{inv.durationInDays} day(s)</dd>
                                                    </div>

                                                    <div className="flex justify-between items-center gap-3">
                                                        <dt className="text-muted-foreground">Started</dt>
                                                        <dd className="font-medium truncate">{formatDate(inv.startedAt)}</dd>
                                                    </div>

                                                    <div className="flex justify-between items-center gap-3">
                                                        <dt className="text-muted-foreground">Ends</dt>
                                                        <dd className="font-medium truncate">{formatDate(inv.endsAt)}</dd>
                                                    </div>

                                                    <div className="flex justify-between items-center gap-3">
                                                        <dt className="text-muted-foreground">ROI Tx ID</dt>
                                                        <dd className="font-medium truncate">
                                                            {inv.roiTransactionId ?? "—"}
                                                        </dd>
                                                    </div>

                                                    <div className="flex justify-between items-center gap-3">
                                                        <dt className="text-muted-foreground">Investment ID</dt>
                                                        <dd className="font-medium truncate">{inv._id}</dd>
                                                    </div>
                                                </dl>

                                                <Separator className="my-3" />

                                                <div className="text-muted-foreground text-xs">
                                                    Created: {formatDate(inv.createdAt)} • Updated: {formatDate(inv.updatedAt)}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
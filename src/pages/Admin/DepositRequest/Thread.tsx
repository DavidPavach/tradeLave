import { useState } from "react";
import { toast } from "react-fox-toast";

// Services
import { useAdminEditRt, useAdminDeleteRt } from "@/services/mutations.service";

// Utils
import { formatCurrency, formatDate } from "@/utils/format";

// Components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog";

// Icons
import { Loader } from "lucide-react";
import { Trash } from "iconsax-reactjs";


// Helper Functions
function StatusBadge({ status }: { status: string }) {

    const normalized = status.toLowerCase();
    const tone = normalized === "approved"
        ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
        : normalized === "rejected"
            ? "bg-rose-500/15 text-rose-300 ring-rose-500/30"
            : "bg-amber-500/15 text-amber-300 ring-amber-500/30";

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 capitalize ${tone}`}>
            {status}
        </span>
    );
}

function PaidBadge({ hasPaid }: { hasPaid: boolean }) {
    const tone = hasPaid
        ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
        : "bg-muted/40 text-muted-foreground ring-border";
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tone}`}>
            {hasPaid ? "Paid" : "Not Paid"}
        </span>
    );
}

export default function Thread({ item }: { item: AdminDepositRequest }) {

    const [draft, setDraft] = useState<string>("");
    const [rtStatus, setRtStatus] = useState<string>(item.status);
    const [error, setError] = useState<string | null>(null);

    const updateRt = useAdminEditRt();
    const handleUpdate = () => {
        const payload = { depositId: item._id, status: rtStatus };
        updateRt.mutate(payload, {
            onSuccess: () => {
                toast.success("Bank Deposit Status was updated successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to update Bank Deposit Request.";
                toast.error(message);
            },
        })
    }

    const sendMessage = useAdminEditRt();
    const handleSend = () => {
        const msg = draft.trim();
        if (!msg) return toast.warning("No message detected, kindly input some messages.");

        const payload = { depositId: item._id, details: { role: "admin", message: draft } }
        sendMessage.mutate(payload, {
            onSuccess: () => {
                toast.success("Message was Added successfully!");
                setError(null);
                setDraft("");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message;
                toast.error(message || "Failed to Add Message.");
            },
        })
    }

    const deleteRt = useAdminDeleteRt();
    const handleDelete = () => {
        deleteRt.mutate(item._id, {
            onSuccess: () => {
                toast.success("Bank Deposit Request deleted successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to delete bank deposit request. Kindly retry.";
                toast.error(message);
            },
        })
    }

    return (
        <section className={"w-full rounded-2xl border border-border bg-card text-card-foreground my-4"}>

            {/* Header */}
            <header className="flex md:flex-row flex-col md:justify-between md:items-start gap-3 p-4 border-border border-b">
                <div className="min-w-0">
                    <h2 className="font-semibold text-sm md:text-base xl:text-lg truncate capitalize">
                        {item.coin} • <span className="montserrat">{item.coinAmount} ~ {formatCurrency(item.amount)}</span> 
                    </h2>
                    <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Created: {formatDate(item.createdAt)} • Updated: {formatDate(item.updatedAt)}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={item.status} />
                    <PaidBadge hasPaid={item.hasPaid} />
                    <span className="inline-flex items-center bg-muted/40 px-2.5 py-1 ring-border rounded-full ring-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                        ID: {item._id}
                    </span>
                </div>
            </header>

            {/* Body */}
            <div className="gap-4 grid md:grid-cols-12 p-4">
                {/* User card */}
                <aside className="md:col-span-4">
                    <div className="bg-background p-4 border border-border rounded-2xl">
                        <div className="flex items-center gap-3">
                            <Avatar className="border border-border rounded-full">
                                <AvatarImage src={item.user.profilePicture} alt="default profile" />
                                <AvatarFallback>TL</AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                                <p className="font-semibold truncate capitalize">{item.user.userName}</p>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm truncate">{item.user.email}</p>
                            </div>
                        </div>

                        <dl className="gap-2 grid mt-4 text-[11px] md:text-xs xl:text-sm">
                            <div className="flex justify-between items-center gap-3">
                                <dt className="text-muted-foreground">Account ID</dt>
                                <dd className="font-medium truncate">{item.user.accountId}</dd>
                            </div>
                            <div className="flex justify-between items-center gap-3">
                                <dt className="text-muted-foreground">User ID</dt>
                                <dd className="font-medium truncate">{item.user._id}</dd>
                            </div>
                        </dl>
                        <div className="space-y-2 my-4 text-[11px] md:text-xs xl:text-sm">
                            <Label htmlFor="status">Update Status</Label>
                            <Select defaultValue={rtStatus} onValueChange={(v) => setRtStatus(v)} disabled={updateRt.isPending}>
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder={rtStatus} />
                                </SelectTrigger>
                                <SelectContent>
                                    {["successful", "failed", "pending", "closed"].map(status => (
                                        <SelectItem key={status} className="text-[11px] md:text-xs xl:text-sm capitalize" value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {item.status !== rtStatus &&
                                <Button className="w-full" onClick={handleUpdate}>
                                    {updateRt.isPending ? <Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> : "Update Request"}
                                </Button>
                            }
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="my-4 w-full">
                                    {deleteRt.isPending ?
                                        <Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> :
                                        <>Delete Request <Trash className="inline size-4 md:size-5 xl:size-6" /></>
                                    }
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the Bank Deposit Request.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </aside>

                {/* Thread */}
                <main className="md:col-span-8">
                    <div className="bg-background border border-border rounded-2xl">
                        <div className="px-4 py-3 border-border border-b">
                            <h3 className="font-semibold text-[11px] md:text-xs xl:text-sm">User Messages</h3>
                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Conversation history from the user</p>
                        </div>

                        <div className="p-4 max-h-[420px] overflow-auto">
                            {(() => {
                                type DetailsMessage = { message: string; at: string };
                                type TimelineMessage = DetailsMessage & { role: "user" | "admin" };

                                const userMsgs: TimelineMessage[] = (item.details?.user ?? []).map((m) => ({
                                    ...m,
                                    role: "user",
                                }));

                                const adminMsgs: TimelineMessage[] = (item.details?.admin ?? []).map((m) => ({
                                    ...m,
                                    role: "admin",
                                }));

                                const all: TimelineMessage[] = [...userMsgs, ...adminMsgs].sort(
                                    (a, b) => new Date(a.at).getTime() - new Date(b.at).getTime()
                                );

                                if (all.length === 0) {
                                    return (
                                        <div className="p-4 md:p-5 xl:p-6 border border-border border-dashed rounded-xl text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center">
                                            No messages yet.
                                        </div>
                                    );
                                }

                                return (
                                    <ul className="space-y-3">
                                        {all.map((m, idx) => {
                                            const isAdmin = m.role === "admin";
                                            return (
                                                <li key={`${m.at}-${idx}`} className={isAdmin ? "flex justify-end" : undefined}>
                                                    <div className={isAdmin ? "text-right" : "flex-1 min-w-0"}>
                                                        <div className={["flex flex-wrap items-center gap-x-2 gap-y-1", isAdmin ? "justify-end" : ""].join(" ")}>
                                                            <span className="font-semibold text-[11px] md:text-xs xl:text-sm capitalize">
                                                                {isAdmin ? "Admin" : item.user.userName}
                                                            </span>
                                                            <span className="text-muted-foreground text-xs">{formatDate(m.at)}</span>
                                                        </div>

                                                        <p className={["mt-1 p-3 ring-border rounded-2xl ring-1 text-[11px] md:text-xs xl:text-sm whitespace-pre-wrap",
                                                            isAdmin ? "bg-primary/20 text-foreground" : "bg-muted/30 text-foreground"].join(" ")}>
                                                            {m.message}
                                                        </p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            })()}
                        </div>

                        {/* Admin composer */}
                        <div className="p-4 border-border border-t">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-[11px] md:text-xs xl:text-sm" htmlFor="admin-message">
                                    Admin reply
                                </label>

                                <textarea id="admin-message" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your message to the user..."
                                    className="bg-card px-3 py-2 border border-border rounded-2xl outline-none focus:ring-2 focus:ring-primary/40 w-full min-h-[96px] text-foreground placeholder:text-muted-foreground resize-y"
                                />

                                {error ? <p className="text-destructive text-sm">{error}</p> : null}

                                <button type="button" onClick={handleSend}
                                    disabled={sendMessage.isPending || draft.trim().length === 0}
                                    className={[
                                        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold",
                                        "bg-primary text-primary-foreground",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "focus:outline-none focus:ring-2 focus:ring-primary/40",
                                    ].join(" ")}>
                                    {sendMessage.isPending ? <Loader className="size-4 md:size-5 xl:size-6 animate-spin" /> : "Send"}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}
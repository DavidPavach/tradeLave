import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks, Utils and Constants
import { useAdminDeleteTx } from "@/services/mutations.service";
import { formatCurrency, formatDate } from "@/utils/format";
import { STATUS_COLORS, TYPE_COLORS } from "./constants";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog";
import Editing from "./Edit";

// Icons
import { Edit, Trash } from "iconsax-reactjs";


export function TransactionsTable({ data }: { data: AdminTx[] }) {

    const [editTx, setEditTx] = useState<AdminTx | null>(null);

    // Functions
    const deleteTx = useAdminDeleteTx();
    const handleDelete = (id: string) => {
        deleteTx.mutate(id, {
            onSuccess: () => {
                toast.success("Transaction deleted successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to delete transaction. Kindly retry.";
                toast.error(message);
            },
        })
    }

    return (
        <>
            {editTx && <Editing tx={editTx} isOpen={!!editTx} onClose={() => setEditTx(null)} />}
            {data.length === 0 ?
                <div className="flex justify-center items-center bg-card mx-auto py-20 rounded-xl max-w-6xl">
                    <p className="text-destructive capitalize">No Transactions</p>
                </div> :
                <main className="pb-4 rounded-xl overflow-x-auto">
                    <table className="w-full text-nowrap">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-950 *:px-4 *:py-3 border-border border-b *:font-semibold *:text-left">
                                <th>User</th>
                                <th>Type</th>
                                <th>Coin</th>
                                <th>Amount</th>
                                <th>Coin Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(tx => (
                                <tr key={tx._id} className="hover:bg-neutral-100 dark:bg-neutral-900 *:px-4 *:py-3 border-border border-b transition-colors">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-8">
                                                <AvatarImage src={tx.user.profilePicture ?? ""} alt={tx.user.userName} />
                                                <AvatarFallback>
                                                    {tx.user.userName.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="font-medium truncate capitalize">{tx.user.userName}</p>
                                                <p className="text-neutral-500 text-xs truncate first-letter:uppercase">{tx.user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <Badge className={`${TYPE_COLORS[tx.transactionType]} text-white capitalize`}>
                                            {tx.transactionType}
                                        </Badge>
                                    </td>

                                    <td className="capitalize">{tx.coin}</td>
                                    <td className="font-medium montserrat">{formatCurrency(tx.amount)}</td>
                                    <td className="font-medium montserrat">{tx.coinAmount}</td>

                                    <td>
                                        <Badge className={`${STATUS_COLORS[tx.status]} text-white`}>
                                            {tx.status}
                                        </Badge>
                                    </td>

                                    <td>
                                        {formatDate(tx.createdAt, "short")}
                                    </td>

                                    <td>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => setEditTx(tx)}>
                                                <Edit className="size-5" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">
                                                        <Trash className="size-5 text-red-100" />
                                                    </Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the Transaction.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(tx._id)}>
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            }
        </>
    )
}

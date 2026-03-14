import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks Enums and Utils
import { useAdminUpdateTx } from "@/services/mutations.service";
import { coinMeta } from "@/enum";
import { formatDate } from "@/utils/format";

// Components
import DownDrawer from "@/components/DownDrawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Icons
import { Loader } from "lucide-react";

const Editing = ({ tx, isOpen, onClose }: { tx: AdminTx, isOpen: boolean, onClose: () => void; }) => {

    const meta = coinMeta[tx.coin];

    const [newStatus, setNewStatus] = useState<string>(tx.status);

    const updateTx = useAdminUpdateTx();
    const handleUpdate = () => {

        if (tx.status === newStatus) return toast.warning("No change detected!!!")

        updateTx.mutate({ status: newStatus, transactionId: tx._id }, {
            onSuccess: () => {
                toast.success("Transaction updated successfully!");
                onClose();
            },
            onError: (error) => {
                toast.error(error.message ?? "Failed to update transaction.");
            }
        });
    }

    return (
        <DownDrawer isOpen={isOpen} onClose={onClose}>
            <h2 className="font-semibold text-lg md:text-xl xl:text-2xl text-center capitalize">{tx.user.userName} {tx.transactionType} Transaction</h2>
            <section className="space-y-4 mt-6">
                <div className="space-y-2">
                    <Label htmlFor="user">User ID</Label>
                    <Input id="user" value={tx.user.userName} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="receiver">Coin</Label>
                    <div className="flex items-center gap-x-2 bg-transparent dark:bg-input/30 px-3 py-2 border border-border rounded-lg">
                        <img src={meta.logo} alt={meta.name + " logo"} className="size-6 md:size-7" />
                        <p className="capitalize">{meta.symbol}</p>
                        <p className="capitalize">{tx.coin}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" value={tx.amount} disabled className="montserrat" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="transactionType">Transaction Type</Label>
                    <Input id="transactionType" value={tx.transactionType} disabled className="capitalize" />
                </div>
                {tx.network &&
                    <div className="space-y-2">
                        <Label htmlFor="network">Network</Label>
                        <Input id="network" value={tx.network} disabled />
                    </div>
                }
                {tx.walletAddress &&
                    <div className="space-y-2">
                        <Label htmlFor="walletAddress">Wallet Address</Label>
                        <Input id="walletAddress" value={tx.walletAddress} disabled />
                    </div>
                }
                {tx.transactionHash &&
                    <div className="space-y-2">
                        <Label htmlFor="transactionHash">Transaction Hash</Label>
                        <Input id="transactionHash" value={tx.transactionHash} disabled />
                    </div>
                }
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={tx.status} onValueChange={(v) => setNewStatus(v)} disabled={updateTx.isPending}>
                        <SelectTrigger className="w-full capitalize">
                            <SelectValue placeholder={tx.status} />
                        </SelectTrigger>
                        <SelectContent >
                            {["successful", "failed", "pending"].map(status => (
                                <SelectItem key={status} className="capitalize" value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="createdAt">Created At</Label>
                    <Input id="createdAt" value={formatDate(tx.createdAt)} disabled />
                </div>
                {tx.status !== newStatus &&
                    <div className="my-4">
                        <Button onClick={handleUpdate} className="w-full">
                            {updateTx.isPending ? <Loader className="size-5 animate-spin" /> : "Update Transaction"}
                        </Button>
                    </div>
                }
            </section>
        </DownDrawer>
    );
}

export default Editing;
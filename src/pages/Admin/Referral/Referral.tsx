import { useState } from "react";
import { toast } from "react-fox-toast";

// Services and Utils
import { useAdminReferral } from "@/services/mutations.service";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils/format";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { Trash2, Mail, Calendar } from "lucide-react";

export function ReferralsList({ referrals }: { referrals: AdminReferral[] }) {

    const [busyId, setBusyId] = useState<string | null>(null);

    const deleteReferral = useAdminReferral();
    const handleDelete = async (id: string) => {
        setBusyId(id);
        deleteReferral.mutate(id, {
            onSuccess: () => {
                toast.success("The Referral was deleted successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to delete referral. Kindly retry.";
                toast.error(message);
            },
        })
    };

    return (
        <Card className={"border-border/70 bg-card"}>
            <CardHeader className="flex flex-row justify-between items-center space-y-0">
                <div className="space-y-1">
                    <CardTitle>Referrals</CardTitle>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        {referrals.length} total
                    </p>
                </div>

                <Badge variant="secondary" className="border border-border/60">
                    Rewards tracked
                </Badge>
            </CardHeader>

            <CardContent className="space-y-3">
                {referrals.length === 0 ? (
                    <div className="bg-muted/30 p-4 md:p-5 xl:p-6 border border-border border-dashed rounded-lg text-center">
                        <p className="font-medium text-[11px] text-destructive md:text-xs xl:text-sm">No referrals</p>
                        <p className="mt-1 text-[11px] text-destructive-foreground md:text-xs xl:text-sm">
                            When your users refer others, they’ll show up here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {referrals.map((r) => {
                            const referred = r.referredUser;
                            const referrer = r.referrer;

                            return (
                                <div key={r._id} className={cn(
                                    "group bg-card p-4 border border-border rounded-xl",
                                    "transition-colors",
                                    "hover:bg-muted/20"
                                )}>
                                    <div className="flex items-start gap-4">
                                        <Avatar className="border border-border size-8 md:size-10 xl:size-12">
                                            <AvatarImage src={referred.profilePicture || undefined} alt={referred.userName || "User"} />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {referrer.userName?.slice(0, 1)?.toUpperCase() ?? "TL"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap justify-between items-start gap-3">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold truncate capitalize">
                                                            {referred.userName}
                                                        </p>
                                                        <Badge variant="outline" className="border-border/70 text-muted-foreground text-xs">
                                                            {referred.accountId}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Mail className="size-3.5" />
                                                            <span className="truncate">{referred.email}</span>
                                                        </span>
                                                        <span className="inline-flex items-center gap-1">
                                                            <Calendar className="size-3.5" />
                                                            Created {formatDate(r.createdAt)}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1">
                                                            <Calendar className="size-3.5" />
                                                            Updated {formatDate(r.updatedAt)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                                            Reward claimed
                                                        </p>
                                                        <p className="font-semibold text-[11px] text-green-600 dark:text-green-400 md:text-xs xl:text-sm montserrat">
                                                            {formatCurrency(r.rewardClaimed)}
                                                        </p>
                                                    </div>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="destructive"
                                                                size="icon"
                                                                className={cn(
                                                                    "size-9",
                                                                    "opacity-100 md:opacity-0 md:group-hover:opacity-100",
                                                                    "transition-opacity"
                                                                )} disabled={busyId === r._id}
                                                                aria-label="Delete referral">
                                                                {busyId === r._id ? (
                                                                    <span className="border-2 border-background/60 border-t-background rounded-full size-4 animate-spin" />
                                                                ) : (
                                                                    <Trash2 className="size-4" />
                                                                )}
                                                            </Button>
                                                        </AlertDialogTrigger>

                                                        <AlertDialogContent className="bg-card border-border">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Delete this referral?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This will permanently remove the referral record for{" "}
                                                                    <span className="font-semibold">
                                                                        {referred.userName}
                                                                    </span>
                                                                    . This action can’t be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className="border-border">
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                                                    onClick={() => handleDelete(r._id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center gap-3 bg-muted/20 mt-3 px-3 py-2 border border-border rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="border border-border size-8 md:size-10 xl:size-12">
                                                        <AvatarImage src={referrer.profilePicture || undefined} alt={referrer.userName || "User"} />
                                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                                            {referrer.userName?.slice(0, 1)?.toUpperCase() ?? "TL"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                                            Referrer
                                                        </p>
                                                        <p className="font-medium text-[11px] md:text-xs xl:text-sm truncate first-letter:uppercase">
                                                            {referrer.userName}{" "}
                                                            <span className="text-muted-foreground">
                                                                • {referrer.email}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
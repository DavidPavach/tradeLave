import { useMemo, useState, } from 'react';
import { AnimatePresence, motion } from "framer-motion";

//Stores and Utils
import { useNotificationStore } from '@/stores/notification.store';
import { formatDate } from '@/utils/format';

//Components
import { Badge } from './ui/badge';

//Icons
import { Clock, DirectInbox, Gift, MoneyForbidden, MoneyRecive, Moneys, MoneySend, NotificationBing, Settings, StatusUp, Trash, WalletAdd } from 'iconsax-reactjs';
import { AlertTriangle, DollarSign, Info, X } from 'lucide-react';
import { Button } from './ui/button';


export const BellIcon = () => {

    const [open, setOpen] = useState(false);

    const { notifications, clearNotification } = useNotificationStore();

    const unreadCount = notifications.length;

    const getNotificationIcon = (type: string, subtype?: string) => {
        switch (type.toLowerCase()) {
            case "transaction":
                switch (subtype?.toLowerCase()) {
                    case "deposit_request":
                        return <WalletAdd className="size-5 text-amber-500" />;
                    case "deposit":
                        return <MoneyRecive className="size-5 text-emerald-500" />;
                    case "withdrawal":
                        return <MoneySend className="size-5 text-destructive" />;
                    case "bonus":
                        return <Moneys className="size-5 text-emerald-500" />;
                    case "penalty":
                        return <MoneyForbidden className="size-5 text-destructive" />;
                    case "referral":
                        return <Gift className="size-5 text-pink-500" />;
                    case "stake":
                        return <StatusUp className="size-5 text-[#16A34A]" />;
                    case "roi":
                        return <DirectInbox className="size-5 text-fuchsia-500" />;
                    default:
                        return <DollarSign className="size-5 text-emerald-500" />;
                }

            case "system":
                return <Settings className="size-5 text-slate-500" />;

            case "alert":
                return <AlertTriangle className="size-5 text-amber-500" />;

            default:
                return <Info className="size-5 text-blue-500" />;
        }
    };

    const getNotificationPriority = (type: string) => {
        if (type.toLowerCase() === "alert") return "high";
        if (type.toLowerCase() === "transaction") return "medium";
        return "low";
    };

    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case "high":
                return {
                    wrapper:
                        "border-destructive/20 bg-destructive/[0.04] hover:bg-destructive/[0.06]",
                    accent: "bg-destructive",
                };
            case "medium":
                return {
                    wrapper:
                        "border-amber-500/20 bg-amber-500/[0.05] hover:bg-amber-500/[0.08]",
                    accent: "bg-amber-500",
                };
            default:
                return {
                    wrapper:
                        "border-border bg-muted/30 hover:bg-muted/50",
                    accent: "bg-slate-400",
                };
        }
    };

    //Functions
    const sortedNotifications = useMemo(() => {
        return [...notifications].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [notifications]);

    const toggleOpen = () => setOpen((prev) => !prev);
    const closePanel = () => setOpen(false);

    return (
        <div className="relative">
            <button className="relative" onClick={toggleOpen}>
                <NotificationBing variant='Bold' className={`text-foreground size-5 md:size-6 xl:size-6 cursor-pointer ${notifications.length > 0 && "animate-shake"}`} />
                {notifications.length > 0 && (
                    <span className="-top-1 -right-1 absolute bg-destructive px-1 rounded-full text-destructive-foreground text-xs">
                        {notifications.length}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.2, ease: "easeOut" }}
                        className="-right-32 absolute bg-background/95 shadow-2xl backdrop-blur-xl mt-3 border border-border rounded-2xl w-[20rem] sm:w-[26rem] md:w-[28rem] overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 py-4 border-border border-b">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-base md:text-lg">
                                        Notifications
                                    </h4>
                                    <Badge className="px-2 py-0.5 rounded-full text-xs" variant="destructive">
                                        {unreadCount}
                                    </Badge>
                                </div>
                                <p className="mt-1 text-muted-foreground text-xs">
                                    Stay updated with your latest account activity
                                </p>
                            </div>

                            <button onClick={closePanel} className="hover:bg-muted p-2 rounded-full text-muted-foreground hover:text-destruction transition cursor-pointer" aria-label="Close notifications">
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[70vh] overflow-y-auto hide-scrollbar">
                            {sortedNotifications.length === 0 ? (
                                <div className="flex flex-col justify-center items-center px-6 py-12 text-center">
                                    <div className="flex justify-center items-center bg-muted mb-4 rounded-full w-14 h-14">
                                        <NotificationBing variant="Linear" className="size-7 text-muted-foreground" />
                                    </div>
                                    <p className="font-medium text-foreground">
                                        No new notifications
                                    </p>
                                    <p className="mt-1 max-w-xs text-muted-foreground text-sm">
                                        You’ll see alerts, transactions, and system updates here.
                                    </p>
                                </div>
                            ) : (
                                <ul className="divide-y divide-border">
                                    {sortedNotifications.map((n) => {
                                        const priority = getNotificationPriority(n.type);
                                        const styles = getPriorityStyles(priority);

                                        return (
                                            <motion.li key={n._id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                transition={{ duration: 0.18 }} className="relative">
                                                <div className={`group relative flex gap-3 border-l-2 px-4 py-4 transition-colors ${styles.wrapper}`}>
                                                    <span className={`absolute left-0 top-0 h-full w-[2px] ${styles.accent}`} />
                                                    <div className="flex justify-center items-center bg-background shadow-sm mt-0.5 border border-border rounded-xl size-10 shrink-0">
                                                        {getNotificationIcon(n.type, n.subtype)}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start gap-3">
                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-foreground md:text-[15px] text-sm truncate capitalize">
                                                                    {n.title}
                                                                </p>

                                                                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground md:text-xs">
                                                                    <Clock className="size-3.5" />
                                                                    <span>{formatDate(n.createdAt)}</span>
                                                                </div>
                                                            </div>

                                                            <button onClick={() => clearNotification(n._id)} className="hover:bg-muted p-1.5 rounded-md text-muted-foreground hover:text-destructive transition cursor-pointer"
                                                                aria-label="Remove notification">
                                                                <Trash className="size-4" />
                                                            </button>
                                                        </div>

                                                        <p className="mt-2 text-muted-foreground text-sm line-clamp-3 leading-6">
                                                            {n.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {sortedNotifications.length > 0 && (
                            <div className="flex justify-between items-center px-4 py-3 border-border border-t">
                                <p className="text-muted-foreground text-xs">
                                    {unreadCount} notification{unreadCount !== 1 ? "s" : ""}
                                </p>

                                <Button variant="ghost" size="sm" onClick={() => {
                                    sortedNotifications.forEach((item) =>
                                        clearNotification(item._id)
                                    );
                                }} className="h-8 text-xs">
                                    Clear all
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

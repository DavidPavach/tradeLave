import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { IconProps as IconsaxIconProps } from "iconsax-reactjs";

// Utils
import { formatCurrency } from "@/utils/format";

// Components
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

//Icons
import { Loader2 } from "lucide-react";
import { WalletAdd, Copy, CopySuccess, Eye, EyeSlash, Graph, Send2, Receipt1, Wallet1, Activity, HomeTrendUp, Gift } from "iconsax-reactjs";


type BalanceSummaryProps = {
    walletId: string;
    balance: string;
    isLoading: boolean;
}

const BalanceSummary = ({ walletId, balance, isLoading }: BalanceSummaryProps) => {

    const [copied, setCopied] = useState<boolean>(false)
    const [see, setSee] = useState<boolean>(true);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletId)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    const actions = [
        { icon: <WalletAdd className="size-4 md:size-5 xl:size-6" />, label: "Deposit", url: "/deposit" },
        { icon: <Graph className="size-4 md:size-5 xl:size-6" />, label: "Stakes", url: "/stakes" },
        { icon: <Send2 className="size-4 md:size-5 xl:size-6" />, label: "Withdrawal", url: "/withdraw" },
        { icon: <Receipt1 className="size-4 md:size-5 xl:size-6" />, label: "History", url: "/history" },
    ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-card border border-border rounded-2xl">
            <div className="p-4 md:p-5 xl:p-6 pb-0">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-secondary">TRADE LAVE ID</span>
                    {isLoading && <Loader2 className="text-border size-4 animate-spin" />}
                </div>
                <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm md:text-base xl:text-lg">{walletId}</span>
                    <button onClick={copyToClipboard} className="hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">
                        {copied ? <CopySuccess className="size-4 md:size-5 xl:size-6 text-green-600 dark:text-green-400" variant="Bold" /> : <Copy className="size-4 md:size-5 xl:size-6" />}
                        <span className="sr-only">Copy wallet ID</span>
                    </button>
                    {copied && (
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-green-600 dark:text-green-400">
                            Copied!
                        </motion.span>
                    )}
                    <button onClick={() => setSee((prev) => !prev)} className="hover:text-destructive transition-colors cursor-pointer">
                        {see ? <Eye className="size-4 md:size-5 xl:size-6" /> : <EyeSlash className="size-4 md:size-5 xl:size-6" />}
                    </button>
                </div>
            </div>

            <div className="px-4 md:px-5 xl:px-6 py-4 montserrat">
                {isLoading ? (
                    <div className="flex items-center space-x-4 h-12">
                        <div className="bg-border rounded w-24 h-8 animate-pulse"></div>
                    </div>
                ) : (
                    <h2 className="font-bold text-3xl md:text-4xl xl:text-5xl">{see ? balance : "****"}</h2>
                )}
            </div>

            <div className="grid grid-cols-4 border-border border-t divide-x divide-border">
                {actions.map((action, index) => (
                    <Link to={action.url} key={index} className="flex flex-col justify-center items-center hover:bg-primary/40 disabled:opacity-50 py-5 transition-colors disabled:cursor-not-allowed">
                        <div className="flex justify-center items-center bg-primary/20 mb-2 rounded-full size-10">
                            {isLoading ? <Loader2 size={16} className="text-border animate-spin" /> : action.icon}
                        </div>
                        <span className="text-xs">{action.label}</span>
                    </Link>
                ))}
            </div>
        </motion.div>
    )
}


type CardSummaryProps = {
    title: string;
    Icon: React.ComponentType<IconsaxIconProps>;
    figure: string;
    isLoading: boolean;
};

const CardSummary = ({ title, Icon, figure, isLoading }: CardSummaryProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0">
                <CardTitle className="font-medium text-base md:text-lg xl:text-xl">{title}</CardTitle>
                <Icon variant="Bulk" className="bg-primary/10 p-2 rounded-lg size-8 md:size-9 xl:size-10 text-primary" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="w-[100px] h-3" /> :
                    <p className="font-bold text-foreground text-lg md:text-xl xl:text-2xl montserrat">{figure}</p>}
            </CardContent>
        </Card>
    );
};

const Summary = ({ accountId, totalBalance, activeStakes, totalRois, totalReferrals, isLoading }: { accountId: string, totalBalance: number, activeStakes: number, totalRois: number, totalReferrals: number, isLoading: boolean }) => {

    const CARD_DATA: { title: string; Icon: React.ComponentType<IconsaxIconProps>; figure: string }[] = [
        { title: "Total Balance", Icon: Wallet1, figure: formatCurrency(totalBalance) },
        { title: "Active Stakes", Icon: Activity, figure: formatCurrency(activeStakes) },
        { title: "Total ROIs", Icon: HomeTrendUp, figure: formatCurrency(totalRois) },
        { title: "Referral Rewards", Icon: Gift, figure: formatCurrency(totalReferrals) },
    ];


    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <BalanceSummary walletId={accountId} balance={formatCurrency(totalBalance)} isLoading={false} />
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-4">
                {CARD_DATA.map((card, index) => (
                    <CardSummary key={index} {...card} isLoading={isLoading} />
                ))}
            </div>
        </motion.div>
    );
}

export default Summary;
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

// Enums and Utils
import { coinMeta } from '@/enum';
import { formatDate, formatAddress, formatCurrency } from '@/utils/format';

// Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Icons
import { X, Copy, Share2, CircleCheckBig, XCircle, ArrowUpRight, ArrowDownLeft, CheckCheck } from 'lucide-react';
import { DocumentDownload, Clock } from 'iconsax-reactjs';

const STATUS_CONFIG = {
    successful: {
        icon: CircleCheckBig,
        color: 'text-green-600 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
        label: 'Successful',
        dotColor: 'bg-green-500'
    },
    pending: {
        icon: Clock,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
        label: 'Pending',
        dotColor: 'bg-amber-500'
    },
    failed: {
        icon: XCircle,
        color: 'text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
        label: 'Failed',
        dotColor: 'bg-red-500'
    }
};

const TYPE_CONFIG = {
    deposit: {
        icon: ArrowDownLeft,
        color: 'text-green-600 bg-green-50 dark:bg-green-950/30',
        label: 'Deposit',
        sign: '+'
    },
    withdrawal: {
        icon: ArrowUpRight,
        color: 'text-red-600 bg-red-50 dark:bg-red-950/30',
        label: 'Withdrawal',
        sign: '-'
    },
    bonus: {
        icon: ArrowDownLeft,
        color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30',
        label: 'Bonus',
        sign: '+'
    },
    penalty: {
        icon: ArrowUpRight,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
        label: 'Penalty',
        sign: '-'
    },
    referral: {
        icon: ArrowDownLeft,
        color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30',
        label: 'Referral',
        sign: '+'
    },
    roi: {
        icon: ArrowDownLeft,
        color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30',
        label: 'ROI',
        sign: '+'
    }
};

export default function TransactionReceipt({ transaction, onClose }: { transaction: Transaction, onClose: () => void; }) {

    const [copied, setCopied] = useState<string | null>(null);

    const statusConfig = STATUS_CONFIG[transaction.status];
    const typeConfig = TYPE_CONFIG[transaction.transactionType];
    const StatusIcon = statusConfig.icon;
    const TypeIcon = typeConfig.icon;

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleDownload = () => {
        const receiptText = `
TRANSACTION RECEIPT
===========================================

Transaction ID: ${transaction._id}
Date: ${formatDate(transaction.createdAt)}

TYPE: ${typeConfig.label}
STATUS: ${statusConfig.label}

COIN: ${transaction.coin.toUpperCase()}
AMOUNT: ${typeConfig.sign}${transaction.amount}
CRYPTOCURRENCY EQUIVALENT: ${transaction.coinAmount}
NETWORK: ${transaction.network || 'N/A'}

${transaction.walletAddress ? `WALLET ADDRESS: ${transaction.walletAddress}` : ''}
${transaction.transactionHash ? `TRANSACTION HASH: ${transaction.transactionHash}` : ''}

ADDITIONAL DETAILS:
${Object.entries(transaction.details || {}).map(([k,v]) => `${k}: ${v}`).join('\n')}

===========================================
Generated: ${formatDate(new Date())}
        `.trim();

        const blob = new Blob([receiptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `receipt-${transaction._id}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const meta = coinMeta[transaction.coin];

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-2 overflow-y-auto" onClick={onClose}>
                <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg overflow-y-auto">
                    <Card className="shadow-2xl py-4 border-border">
                        {/* Header */}
                        <CardHeader className="relative pb-4">
                            <Button variant="ghost" size="icon" onClick={onClose} className="top-4 right-4 absolute size-8">
                                <X className="size-4" />
                            </Button>

                            {/* Receipt Header */}
                            <div className="pt-2 text-center">
                                <div className="inline-flex justify-center items-center bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/25 mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                                    <TypeIcon className="size-6 md:size-7 xl:size-8 text-white" />
                                </div>
                                <h2 className="mb-2 font-bold text-foreground text-lg md:text-xl xl:text-2xl">
                                    Transaction Receipt
                                </h2>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                    {formatDate(transaction.createdAt)}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <div className="flex justify-center mt-4">
                                <div className={cn("inline-flex items-center gap-2 px-4 py-2 border-2 rounded-full font-semibold", statusConfig.color)}>
                                    <StatusIcon className="size-4" />
                                    <span>{statusConfig.label}</span>
                                    <div className={cn("rounded-full size-2 animate-pulse", statusConfig.dotColor)} />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Transaction Type & Amount */}
                            <div className="bg-background py-4 rounded-2xl text-center montserrat">
                                <p className="mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase tracking-wider">
                                    {typeConfig.label} Amount
                                </p>
                                <div>
                                    <h3 className={cn("mb-1 font-bold md:text-xl text-2xl xl:text-4xl", (transaction.transactionType === 'withdrawal' || transaction.transactionType === 'penalty') ? "text-red-600" : "text-green-600")}>
                                        {typeConfig.sign}{formatCurrency(transaction.amount)}
                                    </h3>
                                    <div className="flex justify-center items-center gap-x-1 text-muted-foreground">
                                        <p>{transaction.coinAmount}</p>
                                        {meta?.logo && <img src={meta.logo} alt={meta.name + " logo"} className='size-7 md:size-8 xl:size-9' />}
                                        <span className="font-semibold text-sm md:text-base xl:text-lg">{transaction.coin.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Transaction Details */}
                            <div className="space-y-2">
                                <h4 className="font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase tracking-wider">
                                    Transaction Details
                                </h4>

                                {/* Transaction ID */}
                                <DetailRow label="Transaction ID" value={transaction._id} copyable
                                    onCopy={() => handleCopy(transaction._id, 'id')} copied={copied === 'id'} />

                                {/* Network */}
                                {transaction.network && (
                                    <DetailRow label="Network" value={transaction.network} />
                                )}

                                {/* Wallet Address */}
                                {(transaction.walletAddress) && (
                                    <DetailRow label="Wallet Address" value={formatAddress(transaction.walletAddress)} fullValue={transaction.walletAddress} copyable
                                        onCopy={() => handleCopy(transaction.walletAddress ?? "", 'address')} copied={copied === 'address'} />
                                )}

                                {/* Transaction Hash */}
                                {transaction.transactionHash && (
                                    <DetailRow label="Transaction Hash" value={formatAddress(transaction.transactionHash)} fullValue={transaction.transactionHash} copyable
                                        onCopy={() => handleCopy(transaction.transactionHash ?? "", 'hash')} copied={copied === 'hash'} />
                                )}

                                {/* Additional details from transaction.details */}
                                {transaction.details && Object.keys(transaction.details).length > 0 && (
                                    <>
                                        <Separator />
                                        <div className="space-y-2">
                                            {Object.entries(transaction.details).map(([k, v]) => (
                                                <DetailRow key={k} label={k} value={String(v)} />
                                            ))}
                                        </div>
                                    </>
                                )}

                                <Separator />

                                {/* Timestamps */}
                                <DetailRow label="Created" value={formatDate(transaction.createdAt)} />
                                <DetailRow label="Last Updated" value={formatDate(transaction.updatedAt)} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                                    <DocumentDownload className="mr-2 size-4" />
                                    Download
                                </Button>
                                <Button variant="outline" className="flex-1"
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: 'Transaction Receipt',
                                                text: `Transaction ${transaction._id}`
                                            });
                                        }
                                    }}>
                                    <Share2 className="mr-2 size-4" />
                                    Share
                                </Button>
                            </div>

                            {/* Footer Note */}
                            <div className="pt-2 text-center">
                                <p className="text-yellow-700 dark:text-yellow-500 text-xs">
                                    This is an official transaction receipt. Keep it for your records.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

type DetailsProps = {
    label?: string;
    value?: string;
    fullValue?: string;
    copyable?: boolean;
    onCopy?: (text: string | undefined) => void;
    copied?: boolean;
};
function DetailRow({ label, value, fullValue, copyable, onCopy, copied }: DetailsProps) {
    return (
        <div className="group flex justify-between items-center">
            <span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{label}</span>
            <div className="flex items-center gap-2">
                <span className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm text-right">
                    {value}
                </span>
                {copyable && (
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 size-7 transition-opacity" onClick={() => onCopy?.(fullValue || value)}>
                        {copied ? (
                            <CheckCheck className="size-3.5 text-green-600" />
                        ) : (
                            <Copy className="size-3.5" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}

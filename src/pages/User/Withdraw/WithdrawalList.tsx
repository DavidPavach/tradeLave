import { useState } from "react";
import { motion } from "framer-motion";

// Components
import TransactionItem from "@/components/TransactionItem";
import TransactionReceipt from "@/components/TransactionReceipt";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WithdrawalList = ({ withdrawals }: { withdrawals: Transaction[] }) => {

    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    // Functions
    const onClose = () => setSelectedTx(null);

    return (
        <>
            {selectedTx && <TransactionReceipt transaction={selectedTx} onClose={onClose} />}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="shadow-lg border-border">
                    <CardHeader className="pb-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="font-bold text-base md:text-lg xl:text-xl capitalize">Withdrawal Transactions</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {withdrawals.length === 0 ? (
                            <div className="py-4 text-destructive text-sm md:text-base xl:text-lg text-center">
                                No Transactions Yet
                            </div>
                        ) : (
                            <>
                                {withdrawals.map((transaction: Transaction, index: number) => (
                                    <TransactionItem key={transaction._id} transaction={transaction} index={index} onClick={() => setSelectedTx(transaction)} />
                                ))}
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
}

export default WithdrawalList;
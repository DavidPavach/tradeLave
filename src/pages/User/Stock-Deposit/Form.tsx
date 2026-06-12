import { useState } from "react";

// Enums, and Hooks
import { MINI_DEPOSIT_USD } from "@/enum";
import { useCoinDetails } from "@/Hooks/usePrices";
import { formatCurrency } from "@/utils/format";

// Components
import { Skeleton } from "@/components/ui/skeleton";
import CompleteDeposit from "./CompleteDeposit";

// Icons
import { AddSquare, ArrowDown2, Card, Refresh, SecuritySafe, TickCircle } from "iconsax-reactjs";

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

const PAYMENT_METHODS = [
    { title: "Tether USDT TRC20", value: "tether trc20" },
    { title: "Ethereum ETH", value: "ethereum" },
    { title: "Tether USDT ERC20", value: "tether erc20" },
    { title: "Bitcoin BTC", value: "bitcoin" },
];

export default function DepositForm() {

    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("tether erc20");
    const [isComplete, setIsComplete] = useState<boolean>(false);

    const { loading, fetching, isError, refetch, getCoinDetails } = useCoinDetails();
    const coinDetails = getCoinDetails(paymentMethod);

    const selectedMethod = PAYMENT_METHODS.find((method) => method.value === paymentMethod);

    // Function
    const toggleComplete = () => setIsComplete((prev) => !prev);

    return (
        <>
            {isComplete ?
                <CompleteDeposit coin={paymentMethod} amount={Number(amount)} coinAmount={(parseFloat(amount) / coinDetails.price)} closeModal={toggleComplete} />
                :
                <main>
                    {/* Header */}
                    <div className="relative py-8 md:py-10 border-border border-b overflow-hidden text-center">

                        <div className="z-10 relative">
                            <div className="inline-flex items-center gap-x-2 bg-primary/10 mb-4 px-2 py-2 border border-primary/20 rounded-full text-[11px] text-primary md:text-xs xl:text-sm">
                                <SecuritySafe className="size-4" variant="Bold" />
                                <span>256-bit Secure Deposit</span>
                            </div>

                            <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl tracking-tight">
                                Fund Your Account
                            </h1>

                            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-relaxed">
                                Deposit funds securely and begin managing your stock portfolio instantly.
                            </p>
                        </div>
                    </div>

                    {/* Quick amounts */}
                    <div className="flex flex-col items-center mt-8 px-4">
                        <p className="mb-4 font-medium text-muted-foreground text-sm md:text-base">
                            Quick Select Amount
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            {QUICK_AMOUNTS.map(
                                (quickAmount) => {
                                    const isActive = amount === String(quickAmount);
                                    return (
                                        <button key={quickAmount} onClick={() => setAmount(String(quickAmount))}
                                            className={`px-4 py-2.5 rounded-xl border font-semibold transition-all duration-300 cursor-pointer montserrat
                                    ${isActive ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                                    : "bg-primary/10 hover:bg-primary/20 border-border"}`}>
                                            $
                                            {quickAmount.toLocaleString()}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="gap-3 md:gap-4 xl:gap-5 grid grid-cols-1 xl:grid-cols-[1fr_380px] mx-auto mt-8 px-4 max-w-7xl">
                        {/* Deposit Form */}
                        <div className="bg-card/70 shadow-sm backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border rounded-2xl h-fit">
                            {/* Top */}
                            <div className="flex justify-between sm:items-center gap-4">
                                <div>
                                    <h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
                                        Make a Deposit
                                    </h2>

                                    <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        Fast and secure funding
                                    </p>
                                </div>

                                <div className="flex items-center gap-x-2 bg-green-500/10 px-2 sm:px-4 py-2 border border-green-500/20 rounded-full size-fit text-[11px] text-green-500 md:text-xs xl:text-sm">
                                    <TickCircle className="size-4" variant="Bold" />
                                    <span className="hidden sm:inline">Secure Payment</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="mt-8">
                                <label className="block mb-3 font-medium">
                                    Payment Method{" "}
                                    <span className="text-destructive">*</span>
                                </label>

                                <div className="relative">
                                    <select value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="bg-accent/10 hover:bg-accent/20 dark:bg-accent/20 px-4 py-3 border border-border focus:border-primary/40 rounded-xl outline-none focus:ring-0 w-full text-foreground transition-all duration-300 appearance-none cursor-pointer">
                                        {PAYMENT_METHODS.map(
                                            (method) => (
                                                <option key={method.title} value={method.value} className="bg-background text-foreground">
                                                    {method.title}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <ArrowDown2 className="top-1/2 right-5 absolute size-5 text-muted-foreground -translate-y-1/2 pointer-events-none" variant="Outline" />
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="mt-7">
                                <label className="block mb-3 font-medium">
                                    Amount to Deposit{" "}
                                    <span className="text-destructive">*</span>
                                </label>

                                <div className="flex items-center gap-x-3 bg-accent/10 hover:bg-accent/20 px-4 border border-border focus-within:border-primary/40 rounded-xl transition-all duration-300">
                                    <span className="font-medium text-primary">
                                        $
                                    </span>

                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                                        className="bg-transparent py-3 outline-none w-full placeholder:text-muted-foreground montserrat"
                                    />
                                </div>

                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                                        Minimum deposit is ${MINI_DEPOSIT_USD}
                                    </p>

                                    <p className="font-medium text-[11px] text-primary md:text-xs xl:text-sm">
                                        Instant Processing
                                    </p>
                                </div>
                                {
                                    (paymentMethod.trim() && amount.trim()) &&
                                    <>
                                        {(loading || fetching) && <Skeleton className="mt-0.5 h-2" />}

                                        {isError && <Refresh className="size-4 text-accent animate-spin" onClick={refetch} />}

                                        {(!loading && !fetching && !isError) &&
                                            <p className="mt-2 text-[11px] md:text-xs xl:text-sm montserrat">You are depositing <span className="text-accent">{formatCurrency(parseInt(amount))} ({(parseFloat(amount) / coinDetails.price).toFixed(2)} {coinDetails.symbol})</span><img src={coinDetails.logo} className="inline mx-0.5 size-5 xl:size-6" alt={coinDetails.name} />.</p>
                                        }
                                    </>
                                }
                            </div>

                            {/* Summary */}
                            <div className="bg-primary/5 mt-7 p-4 border border-primary/10 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        Selected Method
                                    </p>
                                    <p className="font-semibold text-[11px] md:text-xs xl:text-sm">
                                        {selectedMethod?.title}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        Deposit Amount
                                    </p>

                                    <p className="font-bold text-primary text-sm md:text-base xl:text-lg montserrat">
                                        $ {amount || "0.00"}
                                    </p>
                                </div>
                            </div>

                            {/* Button */}
                            <button onClick={toggleComplete} disabled={!amount.trim()} className="group flex justify-center items-center gap-x-2 bg-primary hover:opacity-90 mt-7 py-4 rounded-2xl w-full font-semibold text-primary-foreground transition-all duration-300 cursor-pointer">
                                Proceed with Deposit
                                <AddSquare className="size-5 group-hover:rotate-8 transition-all duration-300" />
                            </button>
                        </div>

                        {/* Sidebar */}
                        <div className="flex flex-col gap-5">
                            {/* Methods */}
                            <div className="bg-card/70 shadow-sm backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border rounded-3xl">
                                <h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
                                    Payment Methods
                                </h2>

                                <div className="flex flex-col gap-3 mt-6">
                                    {PAYMENT_METHODS.map(
                                        (method) => {
                                            const isActive = paymentMethod === method.value;

                                            return (
                                                <button key={method.title} onClick={() => setPaymentMethod(method.value)}
                                                    className={`flex items-center gap-x-4 px-4 py-3 border rounded-xl transition-all duration-300 cursor-pointer text-left
                                            ${isActive ? "bg-primary/10 border-primary/30" : "bg-accent/5 hover:bg-accent/10 border-border"}`} >

                                                    <div className={`flex justify-center items-center rounded-xl size-11  ${isActive ? "bg-primary/20" : "bg-accent/10"}`}>
                                                        <Card className={`size-5  ${isActive ? "text-primary" : "text-muted-foreground"}`} variant="Outline" />
                                                    </div>

                                                    <div>
                                                        <p className="font-medium">{method.title}</p>
                                                        <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">Crypto Wallet</p>
                                                    </div>
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="bg-card/70 shadow-sm backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border rounded-xl">
                                <h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
                                    How it Works
                                </h2>

                                <div className="flex flex-col gap-5 mt-6">
                                    {[
                                        "Choose your preferred payment method",
                                        "Enter your desired deposit amount",
                                        "Complete the secure transaction",
                                    ].map((step, index) => (
                                        <div key={step} className="flex items-start gap-x-4">
                                            <div className="flex justify-center items-center bg-primary/10 border border-primary/20 rounded-full min-w-10 h-10 font-bold text-primary montserrat">
                                                0{index + 1}
                                            </div>

                                            <div>
                                                <p className="font-medium"> {step}  </p>

                                                <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                                    Quick and secure  processing
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            }
        </>
    );
}
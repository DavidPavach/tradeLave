import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from '@tanstack/react-router';
import { Route } from "@/routes/_dashboard/deposit";

// Icons
import BankIndex from "./BankIndex";
import CryptoIndex from "./CryptoIndex";

// Icons
import { CreditCard, Coins, ArrowRight } from "lucide-react";

export default function Index() {

    const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);
    const navigate = useNavigate({ from: Route.fullPath });
    const { method } = Route.useSearch();

    const methods = [
        {
            id: "bank",
            title: "Buy Cryptocurrency",
            description: "Fast, secure deposits. Buy directly from your bank account",
            icon: CreditCard,
            details: ["Instant verification", "Multiple currencies supported", "Low transaction fees", "FDIC protected"],
            color: "from-blue-500 to-blue-600",
        },
        {
            id: "crypto",
            title: "Deposit Cryptocurrency",
            description: "Deposit any major cryptocurrency directly to your wallet",
            icon: Coins,
            details: ["All major coins accepted", "24/7 availability", "Instant settlements", "No intermediaries"],
            color: "from-orange-500 to-orange-600",
        },
    ]

    // Functions
    const setMethod = (method: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                method
            })
        })
    }

    return (
        <>
            {method === undefined && (
                <div className="bg-gradient-to-br from-background via-background to-muted/30 min-h-dvh">
                    {/* Main Content */}
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 max-w-6xl">
                        {/* Section Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-20 text-center">
                            <h1 className="mb-6 font-bold text-foreground text-3xl md:text-4xl xl:text-5xl tracking-tight">
                                Choose Your Deposit Method
                            </h1>
                            <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg xl:text-xl leading-relaxed">
                                Select the most convenient way to fund your Trade Lave account. Both methods are secure, transparent, and
                                designed for your peace of mind.
                            </p>
                        </motion.div>

                        {/* Method Selection Grid */}
                        <div className="gap-8 lg:gap-12 grid md:grid-cols-2">
                            {methods.map((method, index) => {
                                const Icon = method.icon
                                const isHovered = hoveredMethod === method.id

                                return (
                                    <motion.div key={method.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} onMouseEnter={() => setHoveredMethod(method.id)} onMouseLeave={() => setHoveredMethod(null)}>
                                        <Link to="/deposit" search={{ method: method.id }}>
                                            <motion.div
                                                className="group relative bg-card p-8 md:p-12 border border-border/50 hover:border-primary/50 rounded-2xl h-full overflow-hidden transition-all duration-500 cursor-pointer"
                                                animate={{
                                                    y: isHovered ? -4 : 0,
                                                    boxShadow: isHovered ? "0 20px 40px rgba(0, 0, 0, 0.1)" : "0 0px 0px rgba(0, 0, 0, 0)",
                                                }}>
                                                {/* Background Gradient */}
                                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${method.color}`} />

                                                {/* Content */}
                                                <div className="z-10 relative flex flex-col h-full">
                                                    {/* Icon Container */}
                                                    <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3 }} className="mb-8">
                                                        <div className={`size-12 md:size-14 xl:size-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                                                            <Icon className="size-6 md:size-7 xl:size-8 text-white" />
                                                        </div>
                                                    </motion.div>

                                                    {/* Text Content */}
                                                    <div className="flex-1">
                                                        <h3 className="mb-3 text-foreground text-xl md:text-2xl xl:text-3xl tracking-tight">
                                                            {method.title}
                                                        </h3>
                                                        <p className="mb-8 text-muted-foreground leading-relaxed">
                                                            {method.description}
                                                        </p>

                                                        {/* Details List */}
                                                        <div className="space-y-3 mb-8">
                                                            {method.details.map((detail, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{
                                                                        opacity: isHovered ? 1 : 0.7,
                                                                        x: isHovered ? 0 : -4,
                                                                    }}
                                                                    transition={{ duration: 0.3, delay: i * 0.05 }} className="flex items-start gap-3">
                                                                    <div
                                                                        className={`size-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${method.color}`}
                                                                    />
                                                                    <span className="text-muted-foreground text-sm">{detail}</span>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* CTA Button */}
                                                    <motion.div onClick={() => setMethod(method.id)} animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-2 text-primary">
                                                        <span>Get started</span>
                                                        <ArrowRight className="size-4" />
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {method === "bank" && (
                <BankIndex />
            )}
            {method === "crypto" && (
                <CryptoIndex />
            )}
        </>
    )
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-fox-toast";

// Utils and Service
import { clearTokens, deleteId } from "@/lib/token";
import { useUserDetails } from "@/services/queries.service";

// Components
import { BellIcon } from "./BellIcon";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

// Icons
import { X, LogOut, ChevronDown } from 'lucide-react';
import { Category, UserTag, DocumentText, Gift, Discover } from "iconsax-reactjs";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { data } = useUserDetails();
    const navigate = useNavigate();

    const profilePicture = data?.data?.profilePicture;
    const status = data?.data?.kyc?.status || "pending"

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close dropdown on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    };

    const handleLogOut = () => {
        toast.info("Logging you out...")
        clearTokens();
        deleteId();
        setTimeout(() => navigate({ to: "/login" }), 1000)
    }

    const handleMenuClick = (action: string) => {
        setIsDropdownOpen(false)

        // Handle different menu actions
        switch (action) {
            case "discover":
                navigate({ to: "/discover" });
                break
            case "strategies":
                navigate({ to: "/strategies" });
                break
            case "referrals":
                navigate({ to: "/referrals" });
                break
            case "profile":
                navigate({ to: "/profile" });
                break
                break
            case "logout":
                handleLogOut();
                break
            default:
                break
        }
    }

    const menuItems = [
        {
            id: "discover",
            label: "Discover",
            icon: <Discover size={18} />,
            action: () => handleMenuClick("discover"),
        },
        {
            id: "strategies",
            label: "Strategies",
            icon: <DocumentText size={18} />,
            action: () => handleMenuClick("strategies"),
        },
        {
            id: "referrals",
            label: "Referrals",
            icon: <Gift size={18} />,
            action: () => handleMenuClick("referrals"),
        },
        {
            id: "profile",
            label: "Profile",
            icon: <UserTag size={18} />,
            action: () => handleMenuClick("profile"),
        },
        {
            id: "logout",
            label: "Log Out",
            icon: <LogOut size={18} />,
            action: () => handleMenuClick("logout"),
            variant: "danger" as const,
        },
    ]

    return (
        <header className="relative flex justify-between items-center bg-background px-2 py-3 border-border border-b">
            <a href="/profile#kyc" className="flex items-baseline gap-x-0.5">
                <Avatar className="border border-border rounded-full">
                    <AvatarImage src={profilePicture || "/user.svg"} alt="default profile" />
                    <AvatarFallback>TL</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-x-0.5">
                    <span className={`size-3 rounded-full ${status === "pending" ? "bg-amber-500" : status === "accepted" ? "bg-green-500" : "bg-destructive"}`} />
                    <span className={`px-2 py-1 border border-border rounded-md ${status === "pending" ? "text-amber-500" : status === "accepted" ? "text-green-500" : "text-destructive"} text-[8px] md:text-[9px] xl:text-[10px] first-letter:uppercase whitespace-nowrap`}>
                        {status}
                    </span>
                </div>
            </a>
            <section className="flex justify-end items-center gap-x-3">
                <BellIcon />
                <ThemeToggle />
                <div className="relative">
                    <button ref={buttonRef} onClick={toggleDropdown} className="flex items-center gap-2 hover:bg-accent p-0.5 border border-border rounded-lg focus:outline-none transition-colors cursor-pointer" aria-label="Open menu" aria-expanded={isDropdownOpen}>
                        <div className="flex justify-center items-center rounded-full size-8">
                            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                {isDropdownOpen ? (
                                    <X size={18} />
                                ) : (
                                    <Category size={18} />
                                )}
                            </motion.div>
                        </div>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div ref={dropdownRef} initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.2 }} className="top-full right-0 z-20 absolute bg-card shadow-2xl mt-2 py-2 border border-border rounded-xl w-56 text-card-foreground">
                                {menuItems.map((item, index) => (
                                    <motion.button key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: index * 0.05 }} onClick={item.action}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${item.variant === "danger" ? "text-destructive hover:bg-red-50" : "text-card-foreground hover:bg-background"}`}>
                                        <div>
                                            {item.icon}
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </header>
    )
}

export default Header
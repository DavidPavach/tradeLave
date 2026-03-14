import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-fox-toast";

// Utils
import { clearAdminTokens } from "@/lib/token";

// Components
import { ThemeToggle } from "./ThemeToggle";

// Icons
import { X, LogOut, ChevronDown } from 'lucide-react';
import { Category, UserTag, Notification1, Profile2User, SecurityUser } from "iconsax-reactjs";


const AdminHeader = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

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
        clearAdminTokens();
        setTimeout(() => navigate({ to: "/operations" }), 1000)
    }

    const handleMenuClick = (action: string) => {
        setIsDropdownOpen(false)

        // Handle different menu actions
        switch (action) {
            case "adminReferral":
                navigate({ to: "/adminReferral" });
                break;
            case "staff":
                navigate({ to: "/staff" });
                break;
            case "notifications":
                navigate({ to: "/notifications" });
                break;
            case "adminProfile":
                navigate({ to: "/adminProfile" });
                break;
            case "logout":
                handleLogOut();
                break;
            default:
                break
        }
    }

    const menuItems = [
        {
            id: "adminReferral",
            label: "Admin Referral",
            icon: <Profile2User size={18} />,
            action: () => handleMenuClick("adminReferral"),
        },
        {
            id: "staff",
            label: "Manage Admins",
            icon: <SecurityUser size={18} />,
            action: () => handleMenuClick("staff"),
        },
        {
            id: "notifications",
            label: "Send Notifications",
            icon: <Notification1 size={18} />,
            action: () => handleMenuClick("notifications"),
        },
        {
            id: "adminProfile",
            label: "Your Profile",
            icon: <UserTag size={18} />,
            action: () => handleMenuClick("adminProfile"),
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
        <header className="flex justify-between items-center bg-background px-2 py-3 border-border border-b">
            <section className="flex justify-end items-center gap-x-3 w-full">
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
                            <motion.div ref={dropdownRef} initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.2 }} className="top-full right-0 z-10 absolute bg-card shadow-2xl mt-2 py-2 border border-border rounded-xl w-56 text-card-foreground">
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

export default AdminHeader
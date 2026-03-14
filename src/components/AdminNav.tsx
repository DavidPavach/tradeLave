import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { Profile2User, ArrangeVertical, Logout, SecurityUser, Notification1, UserTag, BitcoinRefresh, ReceiptText, Bank } from "iconsax-reactjs";

const NAV_LINKS = [
    { href: "/transactions", icon: ArrangeVertical, label: "Transactions" },
    { href: "/depositRequests", icon: Bank, label: "Bank" },
    { href: "/users", icon: Profile2User, label: "Users" },
    { href: "/plans", icon: ReceiptText, label: "Plans" },
    { href: "/investments", icon: BitcoinRefresh, label: "Investments" },
    { href: "/adminReferral", icon: Profile2User, label: "Referral" },
    { href: "/staff", icon: SecurityUser, label: "Staff" },
    { href: "/notifications", icon: Notification1, label: "Notification" },
    { href: "/adminProfile", icon: UserTag, label: "Profile" },
];

const BOTTOM_NAV_LINKS = [
    { href: "/transactions", icon: ArrangeVertical, label: "Transactions" },
    { href: "/depositRequests", icon: Bank, label: "Bank" },
    { href: "/plans", icon: ReceiptText, label: "Plans" },
    { href: "/investments", icon: BitcoinRefresh, label: "Investments" },
    { href: "/users", icon: Profile2User, label: "Users" },
];


export const SideNav = () => {

    const location = useLocation();

    return (
        <main className="hidden lg:block fixed bg-background border-border border-r lg:w-[20rem] h-dvh text-foreground">
            <p className="mt-3.5 px-4 pb-5 xl:pb-4 border-border border-b font-semibold text-xl xl:text-2xl tracking-tight montserrat">TRADE <span className="text-primary">ASSET</span></p>
            <div className="flex flex-col gap-y-5 mt-10 p-4">
                {NAV_LINKS.map((link) => {
                    const IconComponent = link.icon;
                    const isActive = location.href === link.href;

                    return (
                        <Link activeProps={{ className: "bg-primary text-black font-semibold rounded-[3rem]" }} to={link.href} key={link.label}>
                            <motion.button className={`flex items-center gap-x-2 w-full px-4 py-2.5 rounded-[3rem] cursor-pointer transition-all duration-300 hover:bg-primary/30`}>
                                <IconComponent className="size-6" variant={isActive ? "Bold" : "Outline"} />
                                <p>{link.label}</p>
                            </motion.button>
                        </Link>
                    )
                })}
            </div>
            <div className="bottom-4 left-4 absolute w-full">
                <Link to="/logout" activeProps={{ className: "bg-primary text-black font-semibold rounded-[3rem]" }}>
                    <motion.button className={`flex items-center gap-x-2 w-[90%] px-4 py-2.5 rounded-[3rem] cursor-pointer transition-all duration-300 hover:bg-primary/30`}>
                        <Logout className="size-6" />
                        <p>Logout</p>
                    </motion.button>
                </Link>
            </div>
        </main>
    );
}


type NavItem = {
    href: string;
    icon: React.ElementType;
    label: string;
}
const NavItem = ({ href, icon: Icon, label }: NavItem) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link to={href} className="relative">
            <motion.div layout className="relative flex items-center p-1 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 35 }}>
                {isActive && (
                    <motion.div layoutId="bottom-nav-active" className="absolute inset-0 bg-primary rounded-full" transition={{ type: "spring", stiffness: 500, damping: 35 }} />
                )}

                {/* Icon */}
                <motion.div layout className={`relative z-10 rounded-full p-2 ${isActive ? "text-primary-foreground" : "text-foreground hover:text-primary" }`} whileTap={{ scale: 0.9 }}>
                    <Icon size="24" variant="Bold" />
                </motion.div>

                {/* Label */}
                <AnimatePresence>
                    {isActive && (
                        <motion.p initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.2 }}
                            className="z-10 relative pr-3 font-semibold text-primary-foreground text-sm">
                            {label}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
};

export const BottomNav = () => {
    return (
        <nav className="lg:hidden bottom-0 left-0 z-50 fixed bg-background p-2 w-full">
            <div className="flex justify-between items-center bg-white dark:bg-black p-2 rounded-4xl">
                {BOTTOM_NAV_LINKS.map((item) => (
                    <NavItem key={item.label} {...item} />
                ))}
            </div>
        </nav>
    );
}
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

// Stores
import useSectorStore from "@/stores/sector.store";

// Icons
import { Graph, Briefcase, Home3, Logout, Profile, Receipt1, WalletAdd, DocumentText, Discover, GlobalSearch, Candle, StatusUp, TrendUp, ProfileCircle, WalletMinus, Wallet1, Element4, Icon, Bank } from "iconsax-reactjs";

type NavSection = {
    id: string;
    title: string;
    icon: Icon;
    links: {
        href: string;
        icon: Icon;
        label: string;
        subText?: string;
    }[];
};

const CRYPTOCURRENCY_NAV_SECTIONS: NavSection[] = [
    {
        id: "overview",
        title: "Overview",
        icon: Element4,
        links: [
            {
                href: "/dashboard",
                icon: Home3,
                label: "Dashboard",
            },
            {
                href: "/discover",
                icon: Discover,
                label: "Discover",
                subText: "New",
            },
        ],
    },
    {
        id: "portfolio",
        title: "Portfolio",
        icon: Graph,
        links: [
            {
                href: "/stakes",
                icon: Graph,
                label: "Stakes",
            },
            {
                href: "/strategies",
                icon: DocumentText,
                label: "Strategies",
                subText: "Pro",
            },
            {
                href: "/history",
                icon: Receipt1,
                label: "History",
            },
        ],
    },
    {
        id: "wallet",
        title: "Wallet & Funds",
        icon: Wallet1,
        links: [
            {
                href: "/deposit",
                icon: WalletAdd,
                label: "Deposit",
            },
            {
                href: "/withdraw",
                icon: WalletMinus,
                label: "Withdrawal",
            },
        ],
    },
    {
        id: "account",
        title: "Account",
        icon: ProfileCircle,
        links: [
            {
                href: "/profile",
                icon: Profile,
                label: "Profile",
            },
        ],
    },
];

const STOCKS_NAV_SECTIONS: NavSection[] = [
    {
        id: "market",
        title: "Market",
        icon: TrendUp,
        links: [
            {
                href: "/stocks",
                icon: GlobalSearch,
                label: "Stocks",
                subText: "Live",
            },
            {
                href: "/buy-stocks",
                icon: Candle,
                label: "Buy Stocks",
            },
            {
                href: "/request",
                icon: Bank,
                label: "Purchase Request",
            },
            {
                href: "/market-trends",
                icon: TrendUp,
                label: "Market Trends",
                subText: "Hot",
            },
        ],
    },
    {
        id: "wallet",
        title: "Wallet & Funds",
        icon: Wallet1,
        links: [
            {
                href: "/stock-deposit",
                icon: WalletAdd,
                label: "Deposit",
            },
            {
                href: "/stock-withdraw",
                icon: WalletMinus,
                label: "Withdrawal",
            },
        ],
    },
    {
        id: "portfolio",
        title: "Assets",
        icon: Briefcase,
        links: [
            {
                href: "/portfolio",
                icon: Briefcase,
                label: "Portfolio",
            },
            {
                href: "/watchlist",
                icon: StatusUp,
                label: "Watchlist",
                subText: "Pro",
            },
        ],
    }
];

const CRYPTOCURRENCY_BOTTOM_NAV_LINKS = [
    { href: "/dashboard", icon: Home3, label: "Dashboard" },
    { href: "/deposit", icon: WalletAdd, label: "Deposit" },
    { href: "/stakes", icon: Graph, label: "Stakes" },
    { href: "/history", icon: Receipt1, label: "History" },
    { href: "/profile", icon: Profile, label: "Profile" },
];

const STOCKS_NAV_LINKS = [
    { href: "/stocks", icon: GlobalSearch, label: "Stocks" },
    { href: "/stock-deposit", icon: WalletAdd, label: "Deposit" },
    { href: "/buy-stocks", icon: Candle, label: "Buy Stocks" },
    { href: "/portfolio", icon: Briefcase, label: "Portfolio" },
    { href: "/watchlist", icon: StatusUp, label: "Watchlist" },
]


export const SideNav = () => {
    const { selectedSector } = useSectorStore();

    const NAV_SECTIONS =
        selectedSector === "cryptocurrency"
            ? CRYPTOCURRENCY_NAV_SECTIONS
            : STOCKS_NAV_SECTIONS;

    const location = useLocation();

    return (
        <main className="hidden fixed lg:flex flex-col bg-background border-border border-r w-[20rem] h-dvh text-foreground">
            {/* Logo */}
            <div className="mt-3 px-5 pb-2.5 border-border border-b">
                <div className="flex items-center gap-x-2">
                    <img src="/logo.png" alt="logo" className="size-10 object-contain" />

                    <p className="font-bold text-xl xl:text-2xl tracking-tight montserrat">
                        TRADE <span className="text-primary">LAVE</span>
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col flex-1 gap-y-6 mt-6 p-4 overflow-y-auto">
                {NAV_SECTIONS.map((section) => {
                    const SectionIcon = section.icon;

                    return (
                        <div
                            key={section.id}
                            className="flex flex-col gap-y-3"
                        >
                            {/* Section title */}
                            <div className="flex items-center gap-x-2 px-2 font-semibold text-primary text-xs uppercase tracking-wide">
                                <SectionIcon
                                    className="size-4"
                                    variant="Bold"
                                />

                                <p>{section.title}</p>
                            </div>

                            {/* Links */}
                            <div className="flex flex-col gap-y-2">
                                {section.links.map((link) => {
                                    const LinkIcon = link.icon;

                                    const isActive =
                                        location.pathname === link.href;

                                    return (
                                        <Link
                                            key={link.label}
                                            to={link.href}
                                            activeProps={{
                                                className:
                                                    "bg-primary text-black font-semibold rounded-[3rem]",
                                            }}
                                        >
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                className="flex items-center gap-x-3 hover:bg-primary/20 px-4 py-3 rounded-[3rem] w-full transition-all duration-300 cursor-pointer"
                                            >
                                                <LinkIcon
                                                    className="size-5"
                                                    variant={
                                                        isActive
                                                            ? "Bold"
                                                            : "Outline"
                                                    }
                                                />

                                                <p className="text-sm">
                                                    {link.label}
                                                </p>

                                                {link.subText && (
                                                    <div
                                                        className={`px-2.5 py-1 ml-auto text-[10px] font-semibold rounded-full
                                                        ${link.subText ===
                                                                "Live"
                                                                ? "bg-green-500 text-white animate-pulse"
                                                                : link.subText ===
                                                                    "Pro"
                                                                    ? "bg-purple-500 text-white"
                                                                    : link.subText ===
                                                                        "Hot"
                                                                        ? "bg-orange-500 text-white"
                                                                        : "bg-primary text-black"
                                                            }`}
                                                    >
                                                        {link.subText}
                                                    </div>
                                                )}
                                            </motion.button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Logout */}
            <div className="p-4 border-border border-t">
                <Link
                    to="/logout"
                    activeProps={{
                        className:
                            "bg-primary text-black font-semibold rounded-[3rem]",
                    }}
                >
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-x-3 hover:bg-primary/20 px-4 py-3 rounded-[3rem] w-full transition-all duration-300 cursor-pointer"
                    >
                        <Logout className="size-5" />

                        <p className="text-sm">Logout</p>
                    </motion.button>
                </Link>
            </div>
        </main>
    );
};


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
            <motion.div layout className="relative flex items-center gap-x-2 p-1 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 35 }}>
                {isActive && (
                    <motion.div layoutId="bottom-nav-active" className="absolute inset-0 bg-primary rounded-full" transition={{ type: "spring", stiffness: 500, damping: 35 }} />
                )}

                {/* Icon */}
                <motion.div layout className={`relative z-10 rounded-full p-2 ${isActive ? "text-primary-foreground" : "text-foreground hover:text-primary"}`} whileTap={{ scale: 0.9 }}>
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

    const { selectedSector } = useSectorStore();
    const BOTTOM_NAV_LINKS = selectedSector === "cryptocurrency" ? CRYPTOCURRENCY_BOTTOM_NAV_LINKS : STOCKS_NAV_LINKS;

    return (
        <nav className="lg:hidden bottom-0 left-0 z-50 fixed bg-background p-2 w-full">
            <div className="flex justify-between items-center bg-white dark:bg-black p-2 rounded-[2rem]">
                {BOTTOM_NAV_LINKS.map((item) => (
                    <NavItem key={item.label} {...item} />
                ))}
            </div>
        </nav>
    );
}
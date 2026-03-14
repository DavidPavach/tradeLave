import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";

// Icons
import { X, ChevronRight } from "lucide-react";
import { Element4 } from "iconsax-reactjs";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
    { label: "Home", page: "Landing", url: "/" },
    { label: "About", page: "About", url: "/about" },
    { label: "Services", page: "Services", url: "/services" },
    { label: "Contact", page: "Contact", url: "/contact" },
    { label: "Legal", page: "Legal", url: "/legal" },
];

export default function Layout({ children }: { children: React.ReactNode }) {

    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            {/* Navbar */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-background/95 backdrop-blur-xl border-b border-background/30" : "bg-transparent"}`}>
                <div className="flex justify-between items-center mx-auto px-4 md:px-5 xl:px-6 max-w-7xl h-16">
                    {/* Logo */}
                    <Link to={"/"} className="group flex items-center gap-3">
                        <img src="/logo.png" alt="Trade Lave" className="w-auto h-9" />
                        <span className="font-bold text-lg uppercase tracking-tight gradient-text">Trade Lave</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.page} to={link.url}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${location.pathname === link.url ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-accent hover:bg-primary/10"}`}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Toggle and CTA */}
                    <section className="hidden md:flex gap-x-5">
                        <ThemeToggle />
                        <div className="flex items-center gap-3">
                            <Link to="/create" search={{ ref: undefined }} className="bg-gradient-to-r from-accent to-primary hover:opacity-90 px-5 py-2 rounded-lg font-semibold text-sm transition-opacity text-accent-foreground glow-teal-sm">
                                Get Started
                            </Link>
                        </div>
                    </section>

                    {/* Mobile Menu Button */}
                    <section className="md:hidden flex items-center gap-x-3">
                        <ThemeToggle />
                        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X size={22} /> : <Element4 variant="Bold" size={26} />}
                        </button>
                    </section>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden space-y-1 bg-background/95 backdrop-blur-xl px-6 py-4 border-border border-b">
                        {navLinks.map((link) => (
                            <Link key={link.page} to={link.url} onClick={() => setMenuOpen(false)}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${location.pathname === link.url ? "text-accent bg-background/10" : "text-muted-foreground hover:text-foreground"}`}>
                                {link.label}
                                <ChevronRight size={14} className="opacity-50" />
                            </Link>
                        ))}
                        <div className="pt-3 border-border border-t">
                            <Link to="/create" search={{ ref: undefined }} className="block bg-gradient-to-r from-accent to-primary px-5 py-3 rounded-lg w-full font-semibold text-background text-sm text-center">
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Page Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-background border-border border-t">
                <div className="mx-auto px-4 md:px-5 xl:px-6 py-16 max-w-7xl">
                    <div className="gap-10 grid grid-cols-1 md:grid-cols-4 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/logo.png" alt="Trade Lave" className="w-auto h-8" />
                                <span className="font-bold uppercase gradient-text">Trade Lave</span>
                            </div>
                            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
                                Trade and Stake with clarity. Hold with confidence. A digital-asset platform built around transparent fees, security-first operations, and compliance-led onboarding.
                            </p>
                            <p className="mt-4 text-primary text-xs">
                                Trade Lave Group Holdings Ltd
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <p className="mb-4 font-semibold text-accent text-xs uppercase tracking-widest">Platform</p>
                            <div className="space-y-2">
                                {["Landing", "About", "Services", "Contact"].map((page) => (
                                    <Link key={page} to={`/${page.toLowerCase()}` as string} className="block text-muted-foreground hover:text-accent text-sm transition-colors">
                                        {page === "Landing" ? "Home" : page}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="mb-4 font-semibold text-accent text-xs uppercase tracking-widest">Legal</p>
                            <div className="space-y-2">
                                {["Terms of Service", "Privacy Policy", "Risk Disclosure", "Cookie Policy"].map((item) => (
                                    <Link key={item} to={"/legal"} className="block text-muted-foreground hover:text-accent text-sm transition-colors">
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-8 border-border border-t">
                        <p className="text-muted-foreground text-xs">
                            © 2026 Trade Lave Group Holdings Ltd. All rights reserved.
                        </p>
                        <p className="max-w-lg text-muted-foreground text-xs text-center">
                            Crypto Assets are highly volatile. The value of your portfolio can go down as well as up and you may get back less than you invest. This is not financial advice.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
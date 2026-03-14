import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";


// Components
import { SectionEyebrow } from "@/components/Eyebrow";
import { fadeUp } from "@/components/MotionPreset";

// Icons
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { contactChannels, faqs } from "./ContactData";


type ContactFormState = {
    name: string;
    email: string;
    subject: string;
    message: string;
};


export default function Index() {

    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [form, setForm] = useState<ContactFormState>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    // Functions
    const handleChange = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setSubmitted(true);

        // Simulate a form submission after 2 seconds
        setTimeout(() => {
            toast.success("Your Form was submitted successfully.");
            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            })
            setSubmitted(false);
        }, 2000);
    };

    return (
        <div className="pt-16">
            <div className="top-0 z-0 fixed inset-x-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_55%)] opacity-[0.08] h-72 pointer-events-none" />

            <section className="relative border-border/70 border-b overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--primary)_0%,transparent_42%)] opacity-[0.08]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.05))]" />

                <div className="relative mx-auto px-4 md:px-6 xl:px-8 py-24 md:py-32 xl:py-20 max-w-5xl text-center">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                        <SectionEyebrow>Get in touch</SectionEyebrow>
                        <h1 className="mx-auto mt-6 max-w-4xl font-semibold text-foreground text-4xl md:text-5xl xl:text-6xl leading-tight tracking-[-0.04em]">
                            We’re here to help,
                            <span className="block bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-transparent">
                                clearly and professionally.
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg leading-8">
                            Our support team is available to answer questions across
                            onboarding, trading, wallets, compliance, and security.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                    <div className="gap-5 grid sm:grid-cols-2 xl:grid-cols-4">
                        {contactChannels.map((channel, index) => {
                            const Icon = channel.icon;

                            return (
                                <motion.div key={channel.title} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
                                    variants={fadeUp} transition={{ delay: index * 0.05 }} className="bg-card/85 shadow-sm hover:shadow-xl backdrop-blur p-4 md:p-5 xl:p-6 border border-border/70 rounded-[1.75rem] transition-all hover:-translate-y-1 duration-300">
                                    <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-11 text-primary">
                                        <Icon className="size-5" />
                                    </div>
                                    <p className="mb-1 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
                                        {channel.title}
                                    </p>
                                    <p className="mb-1 font-medium text-[11px] text-primary md:text-xs xl:text-sm">
                                        {channel.detail}
                                    </p>
                                    <p className="md:px-[11px] text-[10px] text-muted-foreground xl:text-xs leading-6">
                                        {channel.note}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-card/30 py-16 border-border/70 border-y">
                <div className="mx-auto px-4 md:px-5 lg:px-8 xl:px-6 max-w-7xl">
                    <div className="gap-12 grid lg:grid-cols-[0.95fr_1.05fr]">
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
                            <h2 className="font-semibold text-foreground text-xl md:text-2xl xl:text-3xl tracking-[-0.03em]">
                                Send us a message
                            </h2>
                            <p className="mt-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-7">
                                We aim to respond within one business day.
                            </p>

                            {submitted ? (
                                <div className="bg-card/85 shadow-sm backdrop-blur mt-8 p-4 md:p-7 xl:p-10 border border-border/70 rounded-[1.75rem] text-center">
                                    <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full size-14 text-primary">
                                        <Send className="size-6" />
                                    </div>
                                    <h3 className="font-semibold text-foreground text-base md:text-lg xl:text-xl">
                                        Message sent
                                    </h3>
                                    <p className="mx-auto mt-2 max-w-md text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-7">
                                        Thank you for reaching out. Our team will be in touch within
                                        one business day.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5 mt-8">
                                    <div className="gap-5 grid sm:grid-cols-2">
                                        <div>
                                            <label className="block mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                                                Full name
                                            </label>
                                            <input type="text" required value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                                                className="bg-background px-4 py-3 border border-border focus:border-primary rounded-xl focus:outline-none w-full text-foreground placeholder:text-muted-foreground text-sm"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                                                Email
                                            </label>
                                            <input type="email" required value={form.email} onChange={(e) => handleChange("email", e.target.value)}
                                                className="bg-background px-4 py-3 border border-border focus:border-primary rounded-xl focus:outline-none w-full text-foreground placeholder:text-muted-foreground text-sm"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                                            Subject
                                        </label>
                                        <select value={form.subject} onChange={(e) => handleChange("subject", e.target.value)} className="bg-background px-4 py-3 border border-border focus:border-primary rounded-xl focus:outline-none w-full text-foreground text-sm">
                                            <option value="">Select a topic</option>
                                            <option value="account">Account & Onboarding</option>
                                            <option value="trading">Trading & Orders</option>
                                            <option value="wallets">Wallets & Withdrawals</option>
                                            <option value="fees">Fees & Charges</option>
                                            <option value="compliance">Compliance & Legal</option>
                                            <option value="security">Security</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                                            Message
                                        </label>
                                        <textarea required rows={6} value={form.message} onChange={(e) => handleChange("message", e.target.value)}
                                            className="bg-background px-4 py-3 border border-border focus:border-primary rounded-xl focus:outline-none w-full text-[11px] text-foreground placeholder:text-muted-foreground md:text-xs xl:text-sm resize-none"
                                            placeholder="How can we help?" />
                                    </div>

                                    <button type="submit" className="inline-flex justify-center items-center gap-2 bg-primary shadow-lg shadow-primary/20 px-4 md:px-5 xl:px-6 py-4 rounded-xl w-full font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-transform hover:-translate-y-0.5 duration-300 cursor-pointer">
                                        Send message
                                        <Send className="size-4" />
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
                            <motion.div variants={fadeUp}>
                                <h2 className="font-semibold text-foreground text-xl md:text-2xl xl:text-3xl tracking-[-0.03em]">
                                    Frequently asked questions
                                </h2>
                                <p className="mt-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-7">
                                    Quick answers to the most common support questions.
                                </p>
                            </motion.div>

                            <div className="space-y-3 mt-8">
                                {faqs.map((faq, index) => {
                                    const isOpen = openFaq === index;

                                    return (
                                        <motion.div key={faq.q} variants={fadeUp} className="bg-card/85 shadow-sm backdrop-blur border border-border/70 rounded-2xl overflow-hidden">
                                            <button type="button" className={`${isOpen ? "bg-primary text-primary-foreground" : "text-foreground"} flex justify-between items-start gap-3 px-5 py-4 w-full text-left cursor-pointer`}
                                                onClick={() => setOpenFaq((prev) => (prev === index ? null : index))}>
                                                <p className="pr-2 font-medium text-[11px] md:text-xs xl:text-sm leading-7">
                                                    {faq.q}
                                                </p>
                                                {isOpen ? (
                                                    <ChevronUp className="mt-1 size-4 text-primary shrink-0" />
                                                ) : (
                                                    <ChevronDown className="mt-1 size-4 text-muted-foreground shrink-0" />
                                                )}
                                            </button>

                                            {isOpen ? (
                                                <div className="px-5 pt-3 pb-4 border-border/70 border-t">
                                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-7">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-5xl">
                    <p className="text-muted-foreground text-xs text-center leading-6">
                        Trade Lave Group Holdings Ltd. For regulatory or legal matters,
                        contact compliance@tradelave.com. Response times may vary. We do not
                        provide financial advice.
                    </p>
                </div>
            </section>
        </div>
    );
}
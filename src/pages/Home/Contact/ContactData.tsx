// Icons
import { Clock } from 'lucide-react';
import { Sms, ShieldSecurity, Message } from "iconsax-reactjs"; 


export const faqs = [
    {
        q: "How do I open an account?",
        a: "Click 'Get Started' and complete our digital KYC onboarding process. You’ll need to provide proof of identity and address. Most applications are reviewed within one business day.",
    },
    {
        q: "What fees does Trade Lave charge?",
        a: "We charge transparent maker/taker fees starting from 0.10% for spot trades. Full fee schedules are available on our Services page and within your account dashboard before any trade is placed.",
    },
    {
        q: "How are my assets kept safe?",
        a: "The majority of client assets are held in cold storage. We employ multi-layer security including 2FA, address whitelisting, and continuous 24/7 monitoring. Regular third-party security audits are conducted.",
    },
    {
        q: "Is staking guaranteed to earn rewards?",
        a: "No. Staking and earn programmes are optional and carry risk including potential loss of staked assets. All rates, lock-up periods, and risks are fully disclosed before participation.",
    },
    {
        q: "What is KYC and why is it required?",
        a: "Know Your Customer (KYC) is a regulatory requirement for identity verification. It helps protect against fraud and financial crime. We are committed to a fast, privacy-respecting process.",
    },
    {
        q: "Which countries does Trade Lave operate in?",
        a: "We serve customers across 180+ countries. Some services may not be available in all jurisdictions due to local regulatory requirements. This is clearly communicated during onboarding.",
    },
    {
        q: "How do I withdraw my funds?",
        a: "Withdrawals are processed through your account dashboard. Withdrawal processing times and any applicable fees are clearly shown before you confirm. Address whitelisting adds an extra layer of security.",
    },
    {
        q: "How do I contact support?",
        a: "You can reach our support team via the contact form on this page or by emailing support@tradelave.com. Our team aims to respond within one business day.",
    },
];

export const contactChannels = [
    {
        icon: Sms,
        title: "Email Support",
        detail: "support@tradelave.com",
        note: "Response within 1 business day",
    },
    {
        icon: Message,
        title: "Compliance Enquiries",
        detail: "compliance@tradelave.com",
        note: "For regulatory and legal matters",
    },
    {
        icon: Clock,
        title: "Business Hours",
        detail: "Mon – Fri, 09:00 – 18:00 UTC",
        note: "Platform monitored 24/7",
    },
    {
        icon: ShieldSecurity,
        title: "Security Reports",
        detail: "security@tradelave.com",
        note: "Responsible disclosure programme",
    },
];
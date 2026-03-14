// Icons
import { AlertTriangle, Cookie, Scale } from "lucide-react";
import { ShieldSecurity, DocumentText1 } from "iconsax-reactjs";

export const sections = [
    {
        id: "terms",
        icon: DocumentText1,
        label: "Terms of Service",
        title: "Terms of Service",
        updated: "Last updated: 1 January 2026",
        content: [
            {
                heading: "1. Acceptance of Terms",
                body: "By accessing or using the Trade Lave platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform. Trade Lave Group Holdings Ltd reserves the right to modify these terms at any time.",
            },
            {
                heading: "2. Eligibility",
                body: "You must be at least 18 years of age and legally permitted to engage in crypto asset trading in your jurisdiction to use our services. By using the platform, you represent and warrant that you meet these requirements. It is your responsibility to ensure compliance with local laws.",
            },
            {
                heading: "3. Account Registration & KYC",
                body: "To access our trading services, you must complete our identity verification (KYC) process. You agree to provide accurate, current, and complete information during registration and to update this information as required. We reserve the right to suspend or terminate accounts where information is found to be inaccurate or incomplete.",
            },
            {
                heading: "4. Permitted Use",
                body: "You agree to use the platform solely for lawful purposes. You may not use the platform in any way that violates applicable local, national, or international law; for fraudulent or deceptive purposes; to transmit any unsolicited commercial communications; or to attempt to gain unauthorised access to any part of the platform or its related systems.",
            },
            {
                heading: "5. Trading Services",
                body: "Trade Lave provides spot trading facilities and custodial wallet services. All trades are executed at market prices at the time of order placement. We do not guarantee execution at any specific price. Full fee schedules are available on our Services page and within your account dashboard prior to any trade.",
            },
            {
                heading: "6. Custodial Wallet Services",
                body: "When using our custodial wallet services, Trade Lave holds private keys on your behalf. We employ institutional-grade security measures including cold storage for the majority of assets. However, you acknowledge that custodial services carry inherent risks and that in the event of a security breach, losses may occur.",
            },
            {
                heading: "7. Staking & Earn Programmes",
                body: "Staking and earn programmes are optional and available only where permitted by applicable regulations. Participation is never automatic. All rates, lock-up periods, and risks are disclosed prior to enrolment. Past rates are not indicative of future rewards and participation carries the risk of partial or total loss of staked assets.",
            },
            {
                heading: "8. Limitation of Liability",
                body: "To the maximum extent permitted by law, Trade Lave Group Holdings Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the platform or inability to access the platform.",
            },
            {
                heading: "9. Governing Law",
                body: "These Terms of Service shall be governed by and construed in accordance with applicable law. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts as determined by applicable law and the registered jurisdiction of Trade Lave Group Holdings Ltd.",
            },
        ],
    },
    {
        id: "privacy",
        icon: ShieldSecurity,
        label: "Privacy Policy",
        title: "Privacy Policy",
        updated: "Last updated: 1 January 2026",
        content: [
            {
                heading: "1. Data We Collect",
                body: "We collect information you provide during registration (name, email, date of birth, address, identity documents), information generated through your use of the platform (transaction history, login records, device information, IP addresses), and communications you have with our support team.",
            },
            {
                heading: "2. How We Use Your Data",
                body: "We use your personal data to provide and improve our services; verify your identity for KYC/AML compliance; process transactions; communicate with you about your account; detect and prevent fraud and security incidents; comply with our legal and regulatory obligations; and analyse usage patterns to improve the platform.",
            },
            {
                heading: "3. Legal Basis for Processing",
                body: "We process your personal data on the following legal bases: performance of a contract (to provide our services); legal obligation (KYC/AML compliance); legitimate interests (fraud prevention, security, improving our services); and, where required, your consent (marketing communications).",
            },
            {
                heading: "4. Data Retention",
                body: "We retain your personal data for as long as your account is active and for a period of at least five (5) years thereafter, or longer where required by applicable law (including anti-money laundering legislation). Transaction records may be retained for longer periods as required by regulation.",
            },
            {
                heading: "5. Data Sharing",
                body: "We do not sell your personal data. We may share your data with: identity verification providers; payment processors; regulators and law enforcement where required by law; cloud infrastructure providers under data processing agreements; and professional advisors under confidentiality obligations.",
            },
            {
                heading: "6. Your Rights",
                body: "Subject to applicable law, you have the right to access, rectify, erase, restrict processing of, and port your personal data. You may also object to processing based on legitimate interests. To exercise any of these rights, please contact us at privacy@tradelave.com. Some rights may be limited where we have legal obligations to retain data.",
            },
            {
                heading: "7. International Transfers",
                body: "Your data may be transferred to and processed in countries outside your country of residence. Where we transfer data internationally, we ensure appropriate safeguards are in place, including standard contractual clauses or adequacy decisions as applicable.",
            },
            {
                heading: "8. Contact",
                body: "For any privacy-related enquiries, please contact our Data Protection team at privacy@tradelave.com. Trade Lave Group Holdings Ltd is the data controller for the purposes of this policy.",
            },
        ],
    },
    {
        id: "risk",
        icon: AlertTriangle,
        label: "Risk Disclosure",
        title: "Risk Disclosure Statement",
        updated: "Last updated: 1 January 2026",
        content: [
            {
                heading: "1. Nature of Crypto assets",
                body: "Crypto assets are a highly speculative form of investment. They are not regulated in the same way as traditional financial instruments. Their value can rise and fall rapidly and unpredictably. You should not invest in crypto assets with money you cannot afford to lose.",
            },
            {
                heading: "2. Market Volatility",
                body: "Crypto asset markets operate 24 hours a day, 7 days a week, and can be subject to extreme price movements within very short timeframes. Market liquidity can vary significantly. Past performance is not a reliable indicator of future results. There is no guarantee that you will recover any amount invested.",
            },
            {
                heading: "3. Technology Risks",
                body: "The crypto asset ecosystem depends on complex technologies including blockchains, cryptographic protocols, and software systems. These may be subject to bugs, exploits, forks, protocol changes, or network outages. Trade Lave cannot guarantee protection against all technological risks.",
            },
            {
                heading: "4. Regulatory Risk",
                body: "The regulatory environment for crypto assets is evolving rapidly. Changes in law or regulation in any jurisdiction may materially affect the availability of our services, the value of crypto assets, or your ability to trade or withdraw assets. We may be required to restrict or terminate services in certain jurisdictions with little notice.",
            },
            {
                heading: "5. Custody Risk",
                body: "When using custodial services, your assets are held by Trade Lave on your behalf. While we employ best-in-class security measures, no custody solution is completely risk-free. In the event of a security incident, your assets could be at risk. We maintain comprehensive security protocols to mitigate this risk.",
            },
            {
                heading: "6. Staking & Earn Risks",
                body: "Staking and earn programmes carry specific additional risks. These include: lock-up periods during which you cannot access your assets; protocol or smart contract risks; slashing (reduction of staked amounts) in certain proof-of-stake protocols; counterparty risk; and the risk that reward rates may change or cease entirely.",
            },
            {
                heading: "7. Liquidity Risk",
                body: "Some crypto assets may have limited market liquidity, meaning you may not be able to sell them at your desired price or at all at certain times. Thin order books can result in significant price impact when placing large orders.",
            },
            {
                heading: "8. Not Financial Advice",
                body: "Nothing on the Trade Lave platform constitutes financial, investment, legal, or tax advice. All trading decisions are your own. You should seek independent professional advice if you are unsure whether crypto asset trading is appropriate for your circumstances.",
            },
        ],
    },
    {
        id: "cookies",
        icon: Cookie,
        label: "Cookie Policy",
        title: "Cookie Policy",
        updated: "Last updated: 1 January 2026",
        content: [
            {
                heading: "1. What Are Cookies",
                body: "Cookies are small text files placed on your device when you visit our website. They help us provide a better user experience and allow us to understand how the platform is used. Cookies may be session-based (deleted when you close your browser) or persistent (remain on your device for a set period).",
            },
            {
                heading: "2. Types of Cookies We Use",
                body: "Essential cookies: required for the platform to function correctly (authentication, security, session management). These cannot be disabled. Analytics cookies: help us understand how users interact with our platform, pages visited, and features used. We use this data to improve the platform. Preference cookies: remember your settings such as display preferences and language. These are optional.",
            },
            {
                heading: "3. Third-Party Cookies",
                body: "We use a small number of trusted third-party services (analytics, security) that may place cookies on your device. These providers are bound by their own privacy policies and data processing agreements with us. We do not permit third parties to use cookies for advertising purposes on our platform.",
            },
            {
                heading: "4. Managing Cookies",
                body: "You can manage or disable cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the platform. Essential cookies cannot be disabled as they are required for core platform functions including authentication and security.",
            },
            {
                heading: "5. Cookie Consent",
                body: "Where required by law, we will request your consent before placing non-essential cookies. You may withdraw consent at any time by adjusting your cookie preferences in your account settings or browser.",
            },
        ],
    },
    {
        id: "aml",
        icon: Scale,
        label: "AML Policy",
        title: "AML & Compliance Policy",
        updated: "Last updated: 1 January 2026",
        content: [
            {
                heading: "1. Our Commitment",
                body: "Trade Lave Group Holdings Ltd is committed to the highest standards of anti-money laundering (AML) and counter-terrorism financing (CTF) compliance. We operate in accordance with applicable laws and regulations in all jurisdictions in which we provide services.",
            },
            {
                heading: "2. Know Your Customer (KYC)",
                body: "All customers are required to complete identity verification (KYC) before accessing trading services. This process includes verification of government-issued photo ID and proof of address. Enhanced due diligence may be required for higher-risk customers or transactions.",
            },
            {
                heading: "3. Transaction Monitoring",
                body: "We conduct ongoing transaction monitoring using automated systems and manual review. Unusual or suspicious transaction patterns are investigated and, where required, reported to the relevant authorities in accordance with our legal obligations.",
            },
            {
                heading: "4. Prohibited Activities",
                body: "The Trade Lave platform must not be used for any activity that constitutes or facilitates money laundering, terrorist financing, fraud, market manipulation, or any other illegal activity. Accounts found to be involved in such activity will be immediately suspended and reported to the relevant authorities.",
            },
            {
                heading: "5. Reporting Obligations",
                body: "Trade Lave complies with all applicable suspicious activity reporting requirements. We maintain a dedicated compliance team responsible for monitoring, investigating, and reporting as required. We cooperate fully with law enforcement and regulatory bodies.",
            },
            {
                heading: "6. Compliance Contact",
                body: "For compliance-related enquiries, please contact compliance@tradelave.com. Trade Lave takes all compliance matters seriously and aims to respond to all enquiries within two business days.",
            },
        ],
    },
] as const;
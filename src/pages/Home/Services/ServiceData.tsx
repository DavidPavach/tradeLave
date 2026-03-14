import type { LucideIcon } from "lucide-react";
import type { Icon } from "iconsax-reactjs";

// Icons
import { BarChart3 } from "lucide-react";
import { WalletCheck, ShieldSecurity, PercentageCircle } from "iconsax-reactjs";

export type ServiceItem = {
  id: string;
  icon: LucideIcon | Icon;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  risk: string | null;
};

export type FeeScheduleRow = {
  tier: string;
  volume: string;
  maker: string;
  taker: string;
};

export const services: ServiceItem[] = [
  {
    id: "spot-trading",
    icon: BarChart3,
    title: "Spot Trading",
    tagline: "Trade at real-time market prices",
    desc: "Access active cryptoasset markets with competitive, transparent fee schedules. The experience is designed for speed, clarity, and reliability, with readable price visibility and a cleaner product journey.",
    features: [
      "Real-time market pricing",
      "Transparent maker/taker fee schedule",
      "Market and limit order support",
      "Full trade history and reporting",
      "Fast, modern trading interface",
      "Clear order flow presentation",
    ],
    risk: "The value of cryptoassets can rise and fall rapidly. You may get back less than you invest.",
  },
  {
    id: "custodial-wallets",
    icon: WalletCheck,
    title: "Custodial Wallets",
    tagline: "Secure storage for your digital assets",
    desc: "Trade Lave provides custodial wallet infrastructure designed to balance convenience with strong operational safeguards, helping users deposit, hold, and withdraw assets with more confidence.",
    features: [
      "Multi-currency custodial wallets",
      "Cold storage for the majority of assets",
      "Address whitelisting for withdrawals",
      "Two-factor authentication support",
      "Full transaction audit trail",
      "Clear processing expectations",
    ],
    risk: "Custodial services mean Trade Lave holds private keys on your behalf. Review the applicable terms and disclosures carefully.",
  },
  {
    id: "staking",
    icon: PercentageCircle,
    title: "Staking & Earn",
    tagline: "Put your assets to work — where available",
    desc: "Where permitted, Trade Lave can offer optional staking and earn programmes with clearer participation terms, transparent lock-up periods, and visible reward expectations before enrolment.",
    features: [
      "Optional participation only",
      "Visible APY or APR information",
      "Transparent lock-up and unstaking windows",
      "Rewards credited to wallet balances",
      "Pre-enrolment risk information",
      "Availability based on jurisdiction",
    ],
    risk: "Staking and earn programmes carry additional risks, including lock-up periods, protocol risks, and potential loss. Participation should always be informed and optional.",
  },
  {
    id: "compliance-onboarding",
    icon: ShieldSecurity,
    title: "Compliance Onboarding",
    tagline: "Regulation-first from day one",
    desc: "The onboarding journey is built around verification, trust, and operational readiness, with KYC and AML standards integrated into the experience instead of treated as an afterthought.",
    features: [
      "Streamlined digital KYC process",
      "AML screening and monitoring",
      "Identity verification support",
      "Clear privacy and retention policies",
      "Compliance-aware data handling",
      "Dedicated operational support",
    ],
    risk: null,
  },
];

export const feeSchedule: FeeScheduleRow[] = [
  { tier: "Standard", volume: "< $50,000 / month", maker: "0.10%", taker: "0.15%" },
  { tier: "Pro", volume: "$50,000 – $500,000", maker: "0.08%", taker: "0.12%" },
  { tier: "Advanced", volume: "$500,000 – $5M", maker: "0.05%", taker: "0.08%" },
  { tier: "Institutional", volume: "> $5M", maker: "Custom", taker: "Custom" },
];
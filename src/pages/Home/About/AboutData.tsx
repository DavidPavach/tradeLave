import type { LucideIcon } from "lucide-react";
import type { Icon } from "iconsax-reactjs";

// Icons
import { ShieldTick, Eye, Profile2User } from "iconsax-reactjs";
import { Scale } from "lucide-react";

export type ValueItem = {
    icon: LucideIcon | Icon;
    title: string;
    desc: string;
};

export type MilestoneItem = {
    year: string;
    title: string;
    desc: string;
};

export type TeamItem = {
    role: string;
    area: string;
};

export type StructureItem = {
    title: string;
    role: string;
    desc: string;
};

export const values: ValueItem[] = [
    {
        icon: Eye,
        title: "Radical transparency",
        desc: "Every fee, every risk, and every policy communicated with less ambiguity and stronger product clarity.",
    },
    {
        icon: ShieldTick,
        title: "Security by design",
        desc: "Cold storage, layered account protections, and operational monitoring treated as core infrastructure, not feature dressing.",
    },
    {
        icon: Scale,
        title: "Compliance first",
        desc: "Verification, regulatory alignment, and product boundaries built into the platform experience from the start.",
    },
    {
        icon: Profile2User,
        title: "For every trader",
        desc: "A clearer experience for first-time users, returning customers, and more advanced operators alike.",
    },
];

export const milestones: MilestoneItem[] = [
    {
        year: "2018",
        title: "Founded",
        desc: "Trade Lave Group Holdings Ltd was established with a singular focus: bring more transparency to digital asset trading.",
    },
    {
        year: "2019",
        title: "Custody MVP",
        desc: "Custodial wallet infrastructure launched with cold storage and stronger operational controls from the beginning.",
    },
    {
        year: "2020",
        title: "Spot exchange",
        desc: "Spot trading launched with clearer fee visibility, price access, and a more structured market experience.",
    },
    {
        year: "2022",
        title: "Risk expansion",
        desc: "Product segmentation and optional earn pathways introduced with fuller disclosure around participation and risk.",
    },
    {
        year: "2024",
        title: "Global scale",
        desc: "Expanded operational readiness for broader international coverage and more demanding compliance expectations.",
    },
];

export const team: TeamItem[] = [
    { role: "Chief Executive Officer", area: "Leadership & Vision" },
    { role: "Chief Technology Officer", area: "Platform & Engineering" },
    { role: "Chief Information Security Officer", area: "Security & Infrastructure" },
    { role: "Chief Compliance Officer / MLRO", area: "Regulatory & AML/CTF" },
    { role: "General Counsel", area: "Legal & Governance" },
    { role: "Chief Financial Officer", area: "Finance & Treasury" },
];

export const commitments: string[] = [
  "Plain-English communication on every product",
  "Full fee transparency before any transaction",
  "Compliance-led KYC and AML at onboarding",
  "No high-pressure or misleading promotions",
  "Clear risk disclosures on all products",
  "Third-party security reviews where applicable",
  "Segregated client fund management standards",
  "24/7 incident response and monitoring",
];

export const structureItems: StructureItem[] = [
  {
    title: "Trade Lave Group Holdings Ltd",
    role: "Parent / Holding Company",
    desc: "Brand governance, group policy, treasury direction, and wider organisational oversight.",
  },
  {
    title: "Trade Lave Markets Ltd",
    role: "Core Operating Company",
    desc: "Main operating layer for platform delivery, customer journeys, and product operations.",
  },
  {
    title: "Regional Entities",
    role: "EU & US Operations",
    desc: "Jurisdiction-specific entities used to support regional regulatory and operational requirements.",
  },
];
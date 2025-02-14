import { DollarSign, BellRing, Zap } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface FeatureBadge {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  gradient: string;
  comingSoon?: boolean;
}

export interface StepCardType {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

export const featureBadges: FeatureBadge[] = [
  {
    icon: DollarSign,
    title: "Bridge & Earn Yield",
    subtitle: "Minimum yield 4%",
    gradient: "bg-gradient-to-r from-indigo-700 to-blue-600",
  },
  {
    icon: Zap,
    title: "AI Agent Rebalancing",
    subtitle: "Minimum yield 10%",
    gradient: "bg-gradient-to-r from-green-700 to-teal-600",
    comingSoon: true,
  },
];

export const stepCards: StepCardType[] = [
  {
    icon: DollarSign,
    title: "Connect Your Wallet",
    description:
      "Link your wallet in seconds—our AI instantly scans your balances to let you deposit or swap into stablecoins with ease.",
    step: 1,
  },
  {
    icon: BellRing,
    title: "Deposit or Swap",
    description:
      "Fund your position with USDC directly, or let our AI handle the swaps so you can start earning immediately.",
    step: 2,
  },
  {
    icon: Zap,
    title: "Earn with AI-Powered Yield",
    description:
      "Our AI finds the safest, highest-yield opportunities and invests on your behalf around the clock.",
    step: 3,
  },
  {
    icon: Zap,
    title: "Withdraw Anytime",
    description:
      "You're always in control. Withdraw your USDC whenever you want—no lock-ups, no hidden fees.",
    step: 4,
  },
];

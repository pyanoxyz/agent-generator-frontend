import React from "react";
import { IconType } from "react-icons";
import { BiMessageDetail, BiGitPullRequest } from "react-icons/bi";

import { BsChatDots, BsFileEarmarkText } from "react-icons/bs";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="h-full relative group">
      <div className="h-full rounded-lg bg-bgCards transition-all duration-300 ">
        <div className="h-full flex flex-col p-6">
          <div className="p-2 w-fit mb-4">
            <Icon className="w-8 h-8 text-bgPrimary" />
          </div>
          <h3 className="text-xl font-bold text-textHeading mb-3">{title}</h3>
          <p className="text-textHeading text-sm leading-relaxed flex-grow">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProductFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      icon: BsChatDots, // Changed to chat dots for community interaction
      title: "Never Miss Community Questions",
      description:
        "Our autonomous AI agents instantly respond to issues and discussions across GitHub, Twitter, Discord, and Telegram. No more frustrated contributors waiting for answers.",
    },
    {
      icon: BiGitPullRequest, // Kept pull request icon for PR reviews
      title: "Accelerate PR Reviews",
      description:
        "Automated code review, style checks, and constructive feedback on PRs within minutes. Keep contributors motivated with fast, meaningful responses.",
    },
    {
      icon: BsFileEarmarkText, // Changed to file text for documentation
      title: "Self-Updating Documentation",
      description:
        "Documentation that automatically stays in sync with your code. Detect and fix broken examples, outdated API references, and confusing tutorials.",
    },
    {
      icon: BiMessageDetail, // Changed to message detail for issue management
      title: "Issue Triage & Engagement",
      description:
        "Smart classification of issues, automatic reproduction steps validation, and keeping reporters engaged. Convert bug reports into valuable contributions.",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden px-4 !m-0 bg-bgPrimary w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12">
        What Your DevRel agent can do?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductFeatures;

import React from 'react';
import { IconType } from 'react-icons';
import { 
  BiMessageDetail, 
  BiGitPullRequest 
} from 'react-icons/bi';
import { 
  BsChatDots, 
  BsFileEarmarkText 
} from 'react-icons/bs';

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
      <div className="h-full rounded-lg border border-gray-800 bg-black/40 transition-all duration-300 hover:border-gray-700 hover:bg-black/60">
        <div className="h-full flex flex-col p-6">
          <div className="p-2 w-fit rounded-lg bg-gray-900 mb-4">
            <Icon className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed flex-grow">{description}</p>
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
      description: "Our autonomous AI agents instantly respond to issues and discussions across GitHub, Twitter, Discord, and Telegram. No more frustrated contributors waiting for answers."
    },
    {
      icon: BiGitPullRequest, // Kept pull request icon for PR reviews
      title: "Accelerate PR Reviews",
      description: "Automated code review, style checks, and constructive feedback on PRs within minutes. Keep contributors motivated with fast, meaningful responses."
    },
    {
      icon: BsFileEarmarkText, // Changed to file text for documentation
      title: "Self-Updating Documentation",
      description: "Documentation that automatically stays in sync with your code. Detect and fix broken examples, outdated API references, and confusing tutorials."
    },
    {
      icon: BiMessageDetail, // Changed to message detail for issue management
      title: "Issue Triage & Engagement",
      description: "Smart classification of issues, automatic reproduction steps validation, and keeping reporters engaged. Convert bug reports into valuable contributions."
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden max-w-screen-2xl mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-12">
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
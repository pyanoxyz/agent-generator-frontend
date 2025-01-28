import React from "react";
import { IconType } from "react-icons";
import { MdDataExploration as DataIcon } from "react-icons/md";
import { LuBrain as BrainIcon } from "react-icons/lu";
import { IoRocketOutline as RocketIcon } from "react-icons/io5";

import { BsChatDots } from "react-icons/bs";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

interface Feature {
  icon: IconType;
  title: string;
  description: string | React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="h-full relative group">
      <div className="h-full rounded-lg border-primary border bg-bgCards transition-all duration-300 ">
        <div className="h-full flex flex-col p-6">
          <div className="p-2 w-fit mb-4">
            <Icon className="w-8 h-8 text-primary" />
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
      title: "Automated Customer Support and Personalization",
      description: (
        <>
          Analyzes user behavior patterns to deliver personalized recommendations while providing
          quick responses to customer queries and issues.
        </>
      ),
    },
    {
      icon: DataIcon, // Changed to chat dots for community interaction
      title: "Real-time Data Monitoring and Analysis",
      description: (
        <>
          Tracks multiple data sources, including social media, blockchain transactions, and GitHub
          repositories, transforming data streams into actionable insights.
        </>
      ),
    },
    {
      icon: BrainIcon, // Changed to chat dots for community interaction
      title: "Cross-Platform Intelligence Sharing",
      description: (
        <>
          The agents collaborate and communicate with each other, creating a unified view by
          connecting insights from both onchain and offchain data sources.
        </>
      ),
    },
    {
      icon: RocketIcon, // Changed to chat dots for community interaction
      title: "And much more....",
      description: <>All you can imagine, you can do with AI agent workforce seemlessly</>,
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden px-4 !m-0 bg-bgPrimary w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        What Your AI agent workforce can do?
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

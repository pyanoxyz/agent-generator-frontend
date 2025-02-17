import React from "react";
import { IconType } from "react-icons";
import { MdDataExploration as DataIcon } from "react-icons/md";
import { LuBrain as BrainIcon } from "react-icons/lu";
import { IoRocketOutline as RocketIcon } from "react-icons/io5";

import { BsChatDots } from "react-icons/bs";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: React.ReactNode;
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
      title: "Smart Documentation Interface",
      description: (
        <>
          Transform complex technical content into interactive conversations. Seamlessly integrate
          knowledge from documentation, GitHub repositories, PDFs, and more.
        </>
      ),
    },
    {
      icon: DataIcon, // Changed to chat dots for community interaction
      title: "Automated Community Support",
      description: (
        <>
          Provide consistent, accurate responses across all platforms 24/7, reducing response times
          and maintaining high-quality technical discussions.
        </>
      ),
    },
    {
      icon: BrainIcon, // Changed to chat dots for community interaction
      title: "Community Intelligence",
      description: (
        <>
          Track user sentiment, identify trending topics, and gather actionable insights from
          conversations across all your community channels.
        </>
      ),
    },
    {
      icon: RocketIcon, // Changed to chat dots for community interaction
      title: "And much more....",
      description: (
        <>
          Deploy your intelligent agents across documentation sites, community platforms, and custom
          interfaces while maintaining consistent knowledge and responses.
        </>
      ),
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden px-4 !m-0 bg-bgPrimary w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        What Your AI agents workforce can do?
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

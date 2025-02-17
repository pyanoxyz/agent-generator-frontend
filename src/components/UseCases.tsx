import React from "react";
import { Server, Building2, Users, Code2 } from "lucide-react";

type Props = {
  title: React.ReactNode;
  features: React.ReactNode[];
  icon: React.ElementType;
};

const UseCaseCard = ({ title, features, icon: Icon }: Props) => (
  <div className="border border-gray-800 rounded-lg p-6 transition-colors">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 mr-3 text-black" />
      <h3 className="text-lg font-semibold text-black">{title}</h3>
    </div>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="text-textHeading text-sm flex items-center">
          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const UseCasesSection = () => {
  const useCases = [
    {
      title: "Technical Products & Platforms",
      icon: Server,
      features: [
        "Instant documentation navigation",
        "Technical support automation",
        "User onboarding assistance",
        "Bug report triaging",
      ],
    },
    {
      title: "Enterprise Knowledge Management",
      icon: Building2,
      features: [
        "Internal documentation access",
        "Cross-department knowledge sharing",
        "Training and onboarding",
        "Policy compliance support",
      ],
    },
    {
      title: "Community Management",
      icon: Users,
      features: [
        "24/7 community engagement",
        "Real-time sentiment tracking",
        "Topic trend analysis",
        "Engagement metrics",
      ],
    },
    {
      title: "Open Source Projects",
      icon: Code2,
      features: [
        "Documentation assistance",
        "Contribution guidelines support",
        "Community moderation",
        "Issue tracking",
      ],
    },
  ];

  return (
    <section className="py-16 ">
      <div className="mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black">Use Cases</h2>
          <p className="text-textHeading max-w-2xl mx-auto">
            Powerful AI agents across different scenarios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              features={useCase.features}
              icon={useCase.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

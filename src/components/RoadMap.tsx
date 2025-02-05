import React from "react";

import { LuBot as Bot, LuCloud as Cloud, LuCpu as Cpu } from "react-icons/lu";

interface RoadmapPhaseProps {
  icon: React.ReactNode;
  phase: string;
  title: string;
  description: string;
  isActive: boolean;
}

function RoadmapPhase({
  icon,
  phase,
  title,
  description,
  isActive,
}: RoadmapPhaseProps) {
  return (
    <div
      className={`
      rounded-lg border bg-card text-card-foreground shadow-sm
      relative transition-all duration-300 
      hover:scale-105 hover:shadow-xl
      ${
        isActive
          ? "border-blue-500 bg-blue-900/10"
          : "border-gray-800 bg-transparent"
      }
    `}
    >
      <div className="p-6 space-y-4 relative">
        <div className="flex items-center gap-4">
          <div
            className={`
            p-3 rounded-full 
            ${isActive ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}
          `}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-400">{phase}</p>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>
      {isActive && (
        <div className="absolute -top-0.5 -right-0.5 z-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}

const RoadMap = () => {
  const phases = [
    {
      icon: <Bot className="h-6 w-6" />,
      phase: "Phase 1",
      title: "Agent Creation",
      description:
        "Create and customize your AI agents with our intuitive interface",
      isActive: true,
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      phase: "Phase 2",
      title: "Cloud Integration",
      description: "Run your bots on the cloud with integrated payment systems",
      isActive: false,
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      phase: "Phase 3",
      title: "Edge AI",
      description:
        "Run agents locally with opensource models using our Rust runtime",
      isActive: false,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Development Roadmap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phases.map((phase, index) => (
          <RoadmapPhase key={index} {...phase} />
        ))}
      </div>
    </div>
  );
};

export default RoadMap;

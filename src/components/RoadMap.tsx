import React from "react";
import {
  LuBot as Bot,
  LuCloud as Cloud,
  LuCpu as Cpu,
  LuLock as Shield,
} from "react-icons/lu";
import { MarlinLogo } from "./MarlinLogo";

interface RoadmapPhaseProps {
  icon: React.ReactNode;
  phase: string;
  title: string;
  description: string;
  isActive: boolean;
  partnership?: {
    name: string;
    logo: React.ReactNode;
    url: string;
  };
}

function RoadmapPhase({
  icon,
  phase,
  title,
  description,
  isActive,
  partnership,
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
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        {partnership && (
          <a
            href={partnership.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 pt-2 mt-2 border-t border-gray-800 hover:opacity-80 transition-opacity"
          >
            <span className="text-xs text-gray-500">Powered by</span>
            <div className="w-24 sm:w-32">
              {partnership.logo}
            </div>
          </a>
        )}
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
      title: "Agent creation and deployment",
      description:
        "Create, customize, and deploy AI agents with custom knowledge bases on cloud",
      isActive: true,
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      phase: "Phase 2",
      title: "Actions inside TEE",
      description:
        "Include actions that an agent can execute inside TEE such as on-chain txs and swaps",
      isActive: false,
      partnership: {
        name: "Marlin",
        logo: <MarlinLogo />,
        url: "https://www.marlin.org/",
      },
    },
    {
      icon: <Shield className="h-6 w-6" />,
      phase: "Phase 3",
      title: "Agent communication",
      description: "Private, encrypted Agent to agent communication",
      isActive: false,
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      phase: "Phase 4",
      title: "Edge AI",
      description:
        "Run agents locally with open-source models using our Rust runtime",
      isActive: false,
    },
  ];

  return (
    <div className="pb-16 sm:pb-20 space-y-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent px-4">
        Development Roadmap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {phases.map((phase, index) => (
          <RoadmapPhase key={index} {...phase} />
        ))}
      </div>
    </div>
  );
};

export default RoadMap;
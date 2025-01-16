import React from "react";
import {
  LuBot as Bot,
  // LuCloud as Cloud,
  LuCpu as Cpu,
  // LuLock as Shield,
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
      rounded-lg relative transition-all duration-300 bg-bgCards
    `}
    >
      <div className="p-6 space-y-4 relative">
        <div className="flex items-center gap-4">
          <div
            className={`
            p-3 rounded-full 
            bg-iconColorCards
          `}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm text-black">{phase}</p>
            <h3 className="text-xl font-bold text-textHeading">{title}</h3>
          </div>
        </div>
        <p className="text-textHeading text-sm leading-relaxed">{description}</p>
        {partnership && (
          <a
            href={partnership.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 pt-2 mt-2 border-t border-white hover:opacity-80 transition-opacity"
          >
            <span className="text-xs text-textHeading">Powered by</span>
            <div className="w-24 sm:w-32 text-iconColorCards">{partnership.logo}</div>
          </a>
        )}
      </div>
      {/* {isActive && (
        <div className="absolute -top-0.5 -right-0.5 z-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      )} */}
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
        "Create, customize, and deploy your AI DevRel agents with custom documentation and codebases in the cloud.",
      isActive: true,
      partnership: {
        name: "Marlin",
        logo: <MarlinLogo />,
        url: "https://www.marlin.org/",
      },
    },
    // {
    //   icon: <Cloud className="h-6 w-6" />,
    //   phase: "Phase 2",
    //   title: "Actions inside TEE",
    //   description:
    //     "Include actions that an agent can execute inside TEE such as on-chain txs and swaps",
    //   isActive: false,
    //   partnership: {
    //     name: "Marlin",
    //     logo: <MarlinLogo />,
    //     url: "https://www.marlin.org/",
    //   },
    // },
    // {
    //   icon: <Shield className="h-6 w-6" />,
    //   phase: "Phase 3",
    //   title: "Agent communication",
    //   description: "Private, encrypted Agent to agent communication",
    //   isActive: false,
    // },
    {
      icon: <Cpu className="h-6 w-6" />,
      phase: "Phase 2",
      title: "Edge AI",
      description: "Run agents locally with open-source models using our Rust runtime",
      isActive: false,
    },
  ];

  return (
    <div className="pb-16 sm:pb-20 space-y-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-primary bg-clip-text text-transparent px-4">
        Development Roadmap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-7xl mx-auto">
        {phases.map((phase, index) => (
          <RoadmapPhase key={index} {...phase} />
        ))}
      </div>
    </div>
  );
};

export default RoadMap;

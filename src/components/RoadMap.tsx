import React from "react";
import {
  LuBot as Bot,
  // LuCloud as Cloud,
  LuCpu as Cpu,
  // LuLock as Shield,
} from "react-icons/lu";
import { MarlinLogo } from "./MarlinLogo";
import { RiTeamLine as Team } from "react-icons/ri";
import { RiBarChartBoxAiLine as Analytics } from "react-icons/ri";

interface RoadmapPhaseProps {
  icon: React.ReactNode;
  phase: string;
  title: string;
  description: React.ReactNode;
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
      rounded-lg relative transition-all duration-300 border border-primary bg-bgCards
    `}
    >
      <div className="p-6 space-y-4 relative">
        <div className="flex items-center gap-4">
          <div
            className={`
            p-3 rounded-full 
            bg-primary
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
            className="inline-flex items-center gap-2 pt-2 mt-2 border-t border-black hover:opacity-80 transition-opacity"
          >
            <span className="text-xs text-textHeading">Powered by</span>
            <div className="w-24 sm:w-32 text-primary">{partnership.logo}</div>
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
      title: "Knowledge Foundation (Live)",
      description: (
        <>
          Advanced RAG implementation, Multi-source knowledge integration, Interactive chat
          interface, Base analytics dashboard,
        </>
      ),
      isActive: true,
      partnership: {
        name: "Marlin",
        logo: <MarlinLogo />,
        url: "https://www.marlin.org/",
      },
    },
    {
      icon: <Team className="h-6 w-6" />,
      phase: "Phase 2",
      title: "Community Intelligence  (Months 2-5)",
      description: (
        <>
          Platform integrations (Discord, Slack), Sentiment analysis engine, Community insights
          dashboard, Advanced query handling
        </>
      ),
      isActive: false,
    },
    {
      icon: <Analytics className="h-6 w-6" />,
      phase: "Phase 3",
      title: "Analytics & Insights (Months 6-9)",
      description: (
        <>
          Enhanced sentiment tracking, User journey analytics, Cross-platform metrics, Custom
          reporting tools,
        </>
      ),
      isActive: false,
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      phase: "Phase 4",
      title: "Advanced features (Months 15-21)",
      description: (
        <>
          Edge AI processing, Custom knowledge adaptation, Advanced security features, Enterprise
          compliance tools,
        </>
      ),
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

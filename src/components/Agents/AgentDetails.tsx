import React, { useEffect, useState } from "react";
import { RxCross1 as X } from "react-icons/rx";
import { IoChevronDownOutline as ChevronDown } from "react-icons/io5";
import { SimpleCharacterJSON } from "./ChracterJsonViewer";
import { Agent } from "./agents";
import { FaBrain, FaRobot, FaTag, FaTerminal } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoRefreshOutline } from "react-icons/io5";
import { fetchAgentLogs } from "../../api/agents";
import { useToast } from "../../hooks/useToast";

interface AgentDetailsProps {
  agent: Agent;
  onClose: () => void;
  isMobile?: boolean;
}

export const AgentDetails: React.FC<AgentDetailsProps> = ({ agent, onClose, isMobile = false }) => {
  const { character } = agent;
  const isRunning = agent.status === "running";
  const [logs, setLogs] = useState<string>("");
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const showToast = useToast((state) => state.showToast);

  const loadLogs = async () => {
    try {
      setIsLoadingLogs(true);
      const response = await fetchAgentLogs(agent.agent_id);
      if (response.success) {
        setLogs(response.logs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      showToast("Failed to fetch agent logs", "error");
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const handleRefreshLogs = () => {
    loadLogs();
    showToast("Refreshing logs...", "success");
  };

  useEffect(() => {
    loadLogs();
  }, [agent.agent_id]);

  return (
    <div className="relative h-full flex flex-col bg-secondary md:bg-transparent">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-secondary backdrop-blur-sm border-b border-borderPrimary">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white"
                aria-label="Close details"
              >
                <ChevronDown className="size-5" />
              </button>
            )}
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-black">{character.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <GoDotFill className={isRunning ? "text-primary" : "text-gray-500"} />
                <span className={`text-sm ${isRunning ? "text-primary" : "text-gray-500"}`}>
                  {isRunning ? "Running" : "Stopped"}
                </span>
              </div>
            </div>
          </div>
          {!isMobile && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors rounded-lg"
              aria-label="Close details"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 md:space-y-8 p-4 md:p-6">
          {/* Bio Section */}
          <div className="bg-secondary rounded-lg p-4 md:p-6 border border-borderPrimary">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <FaRobot className="text-blue-400" />
              <h3 className="text-base md:text-lg font-medium text-primary">Bio</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              {character.bio.map((text, index) => (
                <p key={index} className="text-sm md:text-base text-black leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Topics & Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Topics */}
            <div className="bg-secondary rounded-lg p-4 md:p-6 border border-borderPrimary">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <FaTag className="text-purple-400" />
                <h3 className="text-base md:text-lg font-medium text-primary">Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {character.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1 md:py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-xs md:text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div className="bg-secondary rounded-lg p-4 md:p-6 border border-borderPrimary">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <FaBrain className="text-blue-400" />
                <h3 className="text-base md:text-lg font-medium text-primary">Personality</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {character.style.all.map((style, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1 md:py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs md:text-sm"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Logs Section */}
          <div className="border-t border-gray-800 pt-4 md:pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaTerminal className="text-blue-400" />
                <h3 className="text-lg md:text-xl font-semibold text-black">Agent Logs</h3>
              </div>
              <button
                onClick={handleRefreshLogs}
                className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 text-xs md:text-sm text-white bg-bgButton  rounded-lg transition-colors"
              >
                <IoRefreshOutline className="size-3.5 md:size-4" />
                Refresh
              </button>
            </div>
            <div className="bg-secondary rounded-lg border border-borderPrimary">
              {isLoadingLogs ? (
                <div className="h-36 md:h-48 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : logs ? (
                <pre className="p-3 md:p-4 text-xs md:text-sm text-black font-mono whitespace-pre-wrap overflow-x-auto max-h-72 md:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                  {logs}
                </pre>
              ) : (
                <div className="h-36 md:h-48 flex items-center justify-center text-gray-500 text-sm">
                  No logs available
                </div>
              )}
            </div>
          </div>
          {/* Configuration Section */}
          <SimpleCharacterJSON character={character} />

          {/* Agent Info Section */}
          <div className="border-t border-gray-800 pt-4 md:pt-6">
            <h3 className="text-lg md:text-xl font-semibold text-black mb-3 md:mb-4">
              Agent Information
            </h3>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-black">Version</span>
                <span className="text-black">{agent.version}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-black">Created</span>
                <span className="text-black">
                  {new Date(agent.created_at).toLocaleDateString()}
                </span>
              </div>
              {/* <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-black">Agent ID</span>
                <span className="text-black break-all">{agent.agent_id}</span>
              </div> */}
            </div>
          </div>

          {/* Add padding at the bottom for mobile scrolling */}
          {isMobile && <div className="h-16" />}
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      {isMobile && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-secondary border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-bgButton text-white rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

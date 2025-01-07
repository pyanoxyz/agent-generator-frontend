// AgentsDisplay.tsx
import React, { useEffect, useState } from "react";
import { AgentCard } from "./AgentCard";
import { AgentDetails } from "./AgentDetails";
import Loader from "../common/Loader";
import { ErrorState } from "../common/ErrorState";
import { fetchAgents } from "../api/agents";
import { useAccount } from 'wagmi';
import { Agent, AgentListResponse } from "./agents";

export const AgentsDisplay: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<AgentListResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const loadAgents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!address) {
        setError("Please connect your wallet");
        return;
      }
      
      const data = await fetchAgents(address);
      setAgents(data);
    } catch (error) {
      setError(
        typeof error === 'string' ? error : 
        error instanceof Error ? error.message : 
        "Failed to fetch agents"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    loadAgents();
  };

  const handleCloseDetails = () => {
    setSelectedAgent(null);
  };

  useEffect(() => {
    if (address) {
      loadAgents();
    } else {
      setError("Please connect your wallet");
      setIsLoading(false);
    }
  }, [address]);

  // Lock body scroll when details are open on mobile
  useEffect(() => {
    if (selectedAgent && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAgent]);

  if (!address) {
    return (
      <div className="container mx-auto p-4 sm:p-6 h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Connect Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to view your agents</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 h-[calc(100vh-64px)] flex flex-col relative">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            My Agents
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">Manage your deployed AI agents</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : agents?.agents.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-400">
          No agents found. Deploy one to get started!
        </div>
      ) : (
        <>
          {/* Main grid layout */}
          <div
            className={`transition-all duration-300 ease-in-out h-full overflow-hidden
              ${selectedAgent ? "md:grid md:grid-cols-3 md:gap-6" : ""}
            `}
          >
            {/* Agent Cards Section */}
            <div
              className={`
                ${selectedAgent ? "md:col-span-1" : ""}
                transition-all duration-300
                overflow-auto
              `}
              style={{ scrollbarWidth: "none" }}
            >
              <div
                className={`grid gap-4 sm:gap-6
                  ${selectedAgent 
                    ? "grid-cols-1" 
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}
                `}
              >
                {agents?.agents.map((agent) => (
                  <AgentCard
                    key={agent.agent_id}
                    agent={agent}
                    isSelected={selectedAgent?.agent_id === agent.agent_id}
                    onClick={() => setSelectedAgent(agent)}
                  />
                ))}
              </div>
            </div>

            {/* Agent Details Section - Mobile: Full screen overlay, Desktop: Side panel */}
            {selectedAgent && (
              <div 
                className={`
                  fixed md:relative inset-0 md:inset-auto
                  md:col-span-2 bg-black md:bg-black/30 
                  border-t md:border md:border-gray-800 
                  md:rounded-lg overflow-hidden 
                  transition-all duration-300 z-50
                  ${selectedAgent ? "translate-y-0" : "translate-y-full"}
                `}
              >
                <div
                  className="h-full overflow-y-auto"
                  style={{ scrollbarWidth: "none" }}
                >
                  <AgentDetails
                    agent={selectedAgent}
                    onClose={handleCloseDetails}
                    isMobile={window.innerWidth < 768}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
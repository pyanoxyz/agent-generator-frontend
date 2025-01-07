import React from 'react';
import { FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';
import { TbPlayerStop, TbPlayerPlay } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { shutdownAgent, startAgent } from '../api/agents';
import { Agent } from './agents';
import { useToast } from '../../hooks/useToast';
import { AUTH_MESSAGE, useAuth } from '../../hooks/useAuth';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
  onStatusChange?: (agentId: string, status: "running" | "stopped") => void;
}

const getClientIcon = (client: string) => {
  switch (client.toLowerCase()) {
    case 'twitter':
      return <FaTwitter key="twitter" className="text-blue-400 size-4 sm:size-5" />;
    case 'discord':
      return <FaDiscord key="discord" className="text-indigo-400 size-4 sm:size-5" />;
    case 'telegram':
      return <FaTelegram key="telegram" className="text-sky-400 size-4 sm:size-5" />;
    default:
      return null;
  }
};

export const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  isSelected, 
  onClick,
  onStatusChange 
}) => {
  const showToast = useToast((state) => state.showToast);
  const { signIn } = useAuth();
  const isRunning = agent.status === "running";

  const handleStop = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const signature = await signIn();
      
      await shutdownAgent(agent.agent_id, signature, AUTH_MESSAGE);
      showToast('Agent stopped successfully', 'success');
      onStatusChange?.(agent.agent_id, "stopped");
    } catch (error) {
      console.error('Failed to stop agent:', error);
      showToast('Failed to stop agent', 'error');
    }
  };

  const handleStart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const signature = await signIn();
      
      await startAgent(agent.agent_id, signature, AUTH_MESSAGE);
      showToast('Agent started successfully', 'success');
      onStatusChange?.(agent.agent_id, "running");
    } catch (error) {
      console.error('Failed to start agent:', error);
      showToast('Failed to start agent', 'error');
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-black/30 border transition-all cursor-pointer
        ${isSelected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-800'}
        rounded-lg overflow-hidden hover:border-blue-400`}
    >
      {/* Card Content */}
      <div className="p-3 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            {/* Client Icons */}
            <div className="flex gap-1.5 sm:gap-2">
              {agent.character.clients.map((client) => (
                <div
                  key={client}
                  className={`rounded-full p-1.5 sm:p-2 ${
                    isRunning ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                  }`}
                >
                  {getClientIcon(client)}
                </div>
              ))}
            </div>
            {/* Agent Name */}
            <div>
              <h3 className="text-base sm:text-xl font-semibold text-white leading-tight">
                {agent.character.name}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Bio Text */}
        {agent.character.bio[0] && (
          <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
            {agent.character.bio[0]}
          </p>
        )}
      </div>
      
      {/* Card Footer */}
      <div className="border-t border-gray-800 p-3 sm:p-4 flex justify-between items-center bg-black/20 flex-wrap gap-2">
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <GoDotFill className={isRunning ? "text-green-400" : "text-gray-500"} />
          <span className="text-gray-400">
            Status: <span className={isRunning ? 'text-green-400' : 'text-gray-500'}>
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </span>
        </div>

        {/* Action Button */}
        {isRunning ? (
          <button
            onClick={handleStop}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors
              bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs sm:text-sm"
          >
            <TbPlayerStop className="size-3.5 sm:size-4" />
            Stop
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors
              bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs sm:text-sm"
          >
            <TbPlayerPlay className="size-3.5 sm:size-4" />
            Start
          </button>
        )}
      </div>
    </div>
  );
};
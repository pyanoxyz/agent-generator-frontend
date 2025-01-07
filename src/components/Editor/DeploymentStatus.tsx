import React from 'react';
import { BsCheckCircleFill, BsXCircleFill, BsArrowLeft, BsRobot } from 'react-icons/bs';
import { BiLoaderAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface DeploymentStatusProps {
  status: 'success' | 'error' | 'loading';
  error?: string;
  onBack: () => void;
}

const DeploymentStatus: React.FC<DeploymentStatusProps> = ({ status, error, onBack }) => {
  const navigate = useNavigate();

  const handleAgentsNavigation = () => {
    navigate('/agents');
  };

  return (
    <div className="w-full bg-black/30 rounded-lg border border-gray-800 p-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-full max-w-lg">
          {status === 'loading' && (
            <div className="text-center">
              <BiLoaderAlt className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-semibold text-gray-200 mb-2">
                Deploying Your Agent
              </h2>
              <p className="text-gray-400">
                Please wait while we set up your agent...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <BsCheckCircleFill className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-200 mb-2">
                Deployment Successful!
              </h2>
              <p className="text-gray-400 mb-8">
                Your agent has been successfully deployed and is ready to use.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:text-blue-400 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-colors"
                >
                  <BsArrowLeft className="w-4 h-4" />
                  Back to Editor
                </button>
                <button
                  onClick={handleAgentsNavigation}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:text-blue-400 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-colors"
                >
                  <BsRobot className="w-4 h-4" />
                  View Deployed Agents
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <BsXCircleFill className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-200 mb-2">
                Deployment Failed
              </h2>
              <p className="text-red-400 mb-4">
                {error || 'An error occurred during deployment'}
              </p>
              <p className="text-gray-400 mb-8">
                Please try again or contact support if the issue persists.
              </p>
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:text-blue-400 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-colors"
              >
                <BsArrowLeft className="w-4 h-4" />
                Back to Editor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatus;
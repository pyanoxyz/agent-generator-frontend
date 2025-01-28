import { FaRobot as AgentIcon } from "react-icons/fa";

const BrainVisualisation = () => {
  return (
    <div className="w-full h-full relative ">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <AgentIcon className="w-60 h-60 text-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BrainVisualisation;

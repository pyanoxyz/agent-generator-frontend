import { LuBrain as Brain } from "react-icons/lu";

const BrainVisualisation = () => {
  return (
    <div className="w-full h-full relative ">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <Brain className="w-32 h-32 text-blue-400" />
          </div>
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border-4 border-purple-500/20 rounded-full animate-spin-reverse-slow"></div>
          <div className="absolute inset-8 border-4 border-blue-400/20 rounded-full animate-spin-slower"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BrainVisualisation;

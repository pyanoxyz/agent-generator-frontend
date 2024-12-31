import { LuBrain as Brain } from "react-icons/lu";

const BrainVisualisation = () => {
  return (
    <div className="w-full h-full relative ">
       <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <Brain className="w-60 h-60 text-violet-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BrainVisualisation;

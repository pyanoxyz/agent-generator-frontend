import { FaInfoCircle } from "react-icons/fa";
import cn from "classnames";

interface TooltipProps {
  tooltip: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ tooltip, className }) => (
  <div className={cn("relative group flex items-center", className)}>
    <FaInfoCircle className="text-gray-400 group-hover:text-gray-200 size-3.5" />
    <span className="absolute bottom-full z-10 left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex">
      {tooltip}
    </span>
  </div>
);
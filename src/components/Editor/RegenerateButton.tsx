import { LuRefreshCw as RefreshIcon } from "react-icons/lu";

interface RegenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isRegenerating: boolean;
}

const RegenerateButton = ({ onClick, disabled, isRegenerating }: RegenerateButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 px-2 sm:px-4 py-2 text-sm text-primary  border border-primary  rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:drop-shadow-lg"
      title="Regenerate Content"
    >
      <RefreshIcon className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
      <span className="hidden sm:inline">
        {isRegenerating ? "Regenerating..." : "Regenerate Content"}
      </span>
    </button>
  );
};

export default RegenerateButton;

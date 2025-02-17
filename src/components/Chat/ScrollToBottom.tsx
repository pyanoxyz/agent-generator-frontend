import { GoArrowDown as ArrowDown } from "react-icons/go";

type Props = {
  show: boolean;
  onClick: () => void;
};

const ScrollToBottomButton = ({ show, onClick }: Props) => {
  if (!show) {
    return null;
  }
  return (
    <div className="absolute inset-x-0 flex justify-center pointer-events-none bottom-36">
      <button
        onClick={onClick}
        className="p-1 text-[#0d0d0d] transition-all duration-300 ease-in-out bg-[#ffffff] rounded-full shadow-lg pointer-events-auto cursor-pointer  z-10  bg-clip-padding border text-token-text-secondary border-token-border-light right-1/2 translate-x-1/2 bg-token-main-surface-primary w-8 h-8 flex items-center justify-center"
        aria-label="Scroll to bottom"
      >
        <ArrowDown size={24} />
      </button>
    </div>
  );
};

export default ScrollToBottomButton;

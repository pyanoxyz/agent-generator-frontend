import { FaArrowRight } from "react-icons/fa6";

const YieldWithoutChain = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4 h-full">
      <h1 className="text-2xl md:text-4xl font-display font-bold mb-4 animate-fade-in text-center">
        Ready to maximize your USDC yield?
        <br />
      </h1>
      <button
        className="bg-emerald-500 group hover:bg-emerald-600 inline-flex items-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 p-3 sm:p-4 w-full sm:w-auto"
        onClick={() => {
          console.log("Deposit button clicked");
        }}
      >
        <span className="flex-1 text-xs sm:text-sm leading-tight">
          Deposit 20,000 PNO to secure your spot on the priority list
        </span>
        <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
      </button>
    </div>
  );
};

export default YieldWithoutChain;

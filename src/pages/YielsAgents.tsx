import { Navbar } from "@/components/yield/YieldNavBar";
import YieldWithChain from "@/components/yield/YieldWithChain";
import YieldWithoutChain from "@/components/yield/YieldWithoutChain";
import { useSearchParams } from "react-router-dom";

const YieldAgent = () => {
  const [searchParams] = useSearchParams();
  const chain = searchParams.get("chain");

  return (
    <div className="relative h-screen bg-black overflow-scroll">
      <Navbar />

      <div className="inset-0 bg-gradient-to-b flex items-center justify-center from-blue-950/50 to-black h-full overflow-scroll text-white">
        {chain ? <YieldWithChain chain={chain} /> : <YieldWithoutChain />}
      </div>
    </div>
  );
};

export default YieldAgent;

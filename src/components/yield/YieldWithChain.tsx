import { StepCard } from "./StepCard";
import { featureBadges, stepCards } from "./types";

const YieldWithChain = ({ chain }: { chain: string }) => {
  return (
    <div className="w-full h-full overflow-scroll p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="pt-16 pb-16">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 animate-fade-in">
              Tired of Low Yields and Complex Strategies?
              <br />
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
              Grow your USDC with stable 4-15% APY using our Auto Yield AI Agents scanning markets
              24/7.
            </p>
          </div>

          {/* Email Signup */}
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 my-4 animate-fade-in">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 p-4 sm:px-4 rounded-lg border border-gray-800 bg-black/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="h-12 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
              Start Earning More on USDC
            </button>
          </form>

          {/* Beta Access Badge */}
          <div className="flex justify-center">
            <span className="inline-block px-3 py-1 text-xs text-emerald-400 bg-emerald-500/10 rounded-full">
              300 beta spots available — Join waitlist now
            </span>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 my-6">
            {featureBadges.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 
                px-3 sm:px-6 py-2 sm:py-3 rounded-full ${feature.gradient} 
                transition-transform hover:scale-105  w-auto`}
              >
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" />
                <div className="flex flex-col flex-grow sm:flex-grow-0">
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {feature.title}
                  </span>
                  <span className="text-xs text-gray-200">{feature.subtitle}</span>
                </div>
                {feature.comingSoon && (
                  <span className="ml-auto sm:ml-2 text-xs px-2 py-0.5 rounded-full bg-white text-emerald-600 whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Step Cards Grid */}
        <section className="h-[35vh] px-4">
          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stepCards.map((card, index) => (
                <StepCard key={index} card={card} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YieldWithChain;

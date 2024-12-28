import { Link } from "react-router-dom";
import RoadMap from "./RoadMap";
import NavBar from "./NavBar";
// import VSCodeStatsButton from "./ExtensionButton";

const LandingPage = () => {
  return (
    <div className="min-h-screen  text-white font-mono">
      {/* Top Navigation Bar */}
      <NavBar sticky />
      {/* Hero Section */}
      <header className="h-[70vh] flex flex-col items-center justify-center relative">
        {/* Vertical Lines */}
        <div className="absolute inset-0 flex justify-center items-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`
                h-96 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-8
                animate-[float_3s_ease-in-out_infinite]
                ${i === 0 && "opacity-40 rotate-[-10deg] animate-delay-[0ms]"}
                ${i === 1 && "opacity-70 rotate-[-5deg] animate-delay-[600ms]"}
                ${i === 2 && "opacity-100 rotate-0 animate-delay-[1200ms]"}
                ${i === 3 && "opacity-70 rotate-[5deg] animate-delay-[1800ms]"}
                ${i === 4 && "opacity-40 rotate-[10deg] animate-delay-[2400ms]"}
              `}
            />
          ))}
        </div>

        <h1 className="text-3xl lg:text-7xl font-bold mb-8 relative z-10">
          pyano.network
        </h1>
        <p className="text-lg text-center lg:text-2xl text-gray-400 mb-8 tracking-wider z-10">
          THE ORCHESTRATION LAYER OF AI AGENTS
        </p>

        {/* Integration Status Bar */}
        <div className="flex gap-2 flex-col lg:flex-row lg:gap-4 z-10 mb-16">
          <div className="bg-opacity-10 bg-blue-900 border border-blue-800 rounded px-4 py-2 flex justify-between items-center gap-2">
            <span className="text-white">AlizaOS</span>
            <span className="text-blue-500 text-sm">
              ✓ Integration completed
            </span>
          </div>
          <div className="bg-opacity-10 bg-gray-900 border border-gray-800 rounded px-4 py-2 flex justify-between items-center gap-2">
            <span className="text-white">GAME</span>
            <span className="text-gray-500 text-sm">○ Coming soon</span>
          </div>
          <div className="bg-opacity-10 bg-gray-900 border border-gray-800 rounded px-4 py-2 flex justify-between items-center gap-2">
            <span className="text-white">SendAI</span>
            <span className="text-gray-500 text-sm">○ Coming soon</span>
          </div>
          <div className="bg-opacity-10 bg-gray-900 border border-gray-800 rounded px-4 py-2 flex justify-between items-center gap-2">
            <span className="text-white">Gnon</span>
            <span className="text-gray-500 text-sm">○ Coming soon</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-16 z-10">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </svg>
              <span>Twitter Agents</span>
            </div>
            <div className="lg:text-2xl font-bold">100+</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v2h2V7h-2zm0 4v6h2v-6h-2z"></path>
              </svg>
              <span>Telegram Agents</span>
            </div>
            <div className="lg:text-2xl font-bold">100+</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path>
              </svg>
              <span>Discord Agents</span>
            </div>
            <div className="lg:text-2xl font-bold">100+</div>
          </div>
        </div>
      </header>

      <section className="py-10 relative">
        <div className="container mx-auto px-6 text-center">
          <Link to="/generate">
            <button className="bg-black border border-gray-400 hover:border-white px-8 py-4 rounded-none flex items-center gap-2 mx-auto group transition-colors duration-300 animate-pulse">
              <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                Create Agent 🚀
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* Phases Section */}
      <section className="mt-40 relative overflow-hidden max-w-screen-2xl mx-auto">
        <RoadMap />
      </section>
      {/* Footer */}
      <footer className="py-8 border-t border-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-600 font-mono text-sm">
            PYANO.NETWORK ©️ 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

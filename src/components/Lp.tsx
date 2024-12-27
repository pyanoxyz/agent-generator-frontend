import React from "react";
import { FaChevronRight as ChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FormPage from "./CreateAgentForm";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-end items-center h-16 gap-6">
            <a
              href="https://twitter.com/pyanonetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
              </svg>
            </a>
            <a
              href="https://t.me/pyanonetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/pyanonetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://calendly.com/pyanonetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.5 3h-3V1.5a1.5 1.5 0 0 0-3 0V3h-3V1.5a1.5 1.5 0 0 0-3 0V3h-3C2.67 3 2 3.67 2 4.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM19 19H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="h-screen flex flex-col items-center justify-center relative">
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
              style={{
                animationName: "float",
                "@keyframes float": {
                  "0%": {
                    transform: `translateY(0) rotate(${(i - 2) * 5}deg)`,
                    opacity: 0,
                  },
                  "20%": {
                    opacity: i === 2 ? 1 : i === 1 || i === 3 ? 0.7 : 0.4,
                  },
                  "80%": {
                    opacity: i === 2 ? 1 : i === 1 || i === 3 ? 0.7 : 0.4,
                  },
                  "100%": {
                    transform: `translateY(-20px) rotate(${(i - 2) * 5}deg)`,
                    opacity: 0,
                  },
                },
              }}
            />
          ))}
        </div>

        <h1 className="text-5xl font-bold mb-4 relative z-10">pyano.network</h1>
        <p className="text-2xl text-gray-400 mb-8 tracking-wider z-10">
          THE OPERATING LAYER OF AI AGENTS
        </p>

        {/* Integration Status Bar */}
        <div className="flex gap-4 z-10 mb-16">
          <div className="bg-opacity-10 bg-blue-900 border border-blue-800 rounded px-4 py-2 flex items-center gap-2">
            <span className="text-white">AlizaOS</span>
            <span className="text-blue-500 text-sm">
              ✓ Integration completed
            </span>
          </div>
          <div className="bg-opacity-10 bg-gray-900 border border-gray-800 rounded px-4 py-2 flex items-center gap-2">
            <span className="text-white">GAME</span>
            <span className="text-gray-500 text-sm">○ Coming soon</span>
          </div>
          <div className="bg-opacity-10 bg-gray-900 border border-gray-800 rounded px-4 py-2 flex items-center gap-2">
            <span className="text-white">SendAI</span>
            <span className="text-gray-500 text-sm">○ Coming soon</span>
          </div>
          <div className="bg-opacity-10 bg-gray-900 border border-gray-800 rounded px-4 py-2 flex items-center gap-2">
            <span className="text-white">Gnon</span>
            <span className="text-gray-500 text-sm">○ Coming soon</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="flex gap-16 z-10">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </svg>
              <span>Twitter Agents</span>
            </div>
            <div className="text-2xl font-bold">12.5K</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v2h2V7h-2zm0 4v6h2v-6h-2z"></path>
              </svg>
              <span>Telegram Agents</span>
            </div>
            <div className="text-2xl font-bold">8.2K</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path>
              </svg>
              <span>Discord Agents</span>
            </div>
            <div className="text-2xl font-bold">15.3K</div>
          </div>
        </div>
      </header>

      {/* Phases Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Background vertical lines */}
          <div className="absolute inset-0 flex justify-between">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-full w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent"
              />
            ))}
          </div>

          <div className="flex justify-between items-stretch gap-4 relative">
            {/* Phase 1 */}
            <div className="flex-1 bg-black border border-gray-800 p-8 backdrop-blur-sm hover:border-blue-500 transition-colors duration-300">
              <div className="text-blue-500 mb-4 text-xl font-bold">01</div>
              <h3 className="text-xl font-bold mb-4 tracking-wider">
                LOCAL AI
              </h3>
              <p className="text-gray-400 mb-4">
                Make and Run AI Agents with PAID AI model locally
              </p>
            </div>

            {/* Phase 2 */}
            <div className="flex-1 bg-black border border-gray-800 p-8 backdrop-blur-sm hover:border-purple-500 transition-colors duration-300">
              <div className="text-purple-500 mb-4 text-xl font-bold">02</div>
              <h3 className="text-xl font-bold mb-4 tracking-wider">
                CLOUD AI
              </h3>
              <p className="text-gray-400 mb-4">
                Make and Run AI agents on the cloud
              </p>
            </div>

            {/* Phase 3 */}
            <div className="flex-1 bg-black border border-gray-800 p-8 backdrop-blur-sm hover:border-cyan-500 transition-colors duration-300">
              <div className="text-cyan-500 mb-4 text-xl font-bold">03</div>
              <h3 className="text-xl font-bold mb-4 tracking-wider">
                RUST RUNTIME
              </h3>
              <p className="text-gray-400 mb-4">
                Make and run AI agents with our Rust based runtime locally on
                your machine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <FormPage />
          {/* <Link to="/generate">
            <button className="bg-transparent border border-gray-700 hover:border-white px-8 py-4 rounded-none flex items-center gap-2 mx-auto group transition-colors duration-300">
              <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                Create Agents
              </span>
              <ChevronRight
                className="text-gray-400 group-hover:text-white transition-colors duration-300"
                size={20}
              />
            </button>
          </Link> */}
        </div>
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

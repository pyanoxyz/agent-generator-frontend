import { Link } from "react-router-dom";
import RoadMap from "./RoadMap";
import NavBar from "./layout/NavBar";
import { useState } from "react";
import Footer from "./Footer";
import ProductFeatures from "./ProductFeatures";
import PlatformIntegrations from "./PlatformIntegrations";
import ChatNavigationCards from "./ChatNavigationCards";
import classNames from "classnames";
import horizontalLines from "../assets/hr.svg";

import VerticalBars from "./SpacedBars";

export const CrossSvg = ({ className = "" }) => {
  return (
    <div className={className}>
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.5 0V21" stroke="#009C41" stroke-width="3" />
        <path d="M0 10.5L21 10.5" stroke="#009C41" stroke-width="3" />
      </svg>
    </div>
  );
};

export const FadeBorderHorizontal = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="h-full px-10 flex items-center justify-center  ">
        <div
          className={classNames(
            "h-px w-full  bg-gradient-to-r from-transparent via-black to-transparent"
          )}
        />
        {/* <div 
  className="w-px h-96" 
  style={{
    background: 'linear-gradient(to bottom, transparent 0%, rgb(34 197 94) 30%, rgb(34 197 94) 70%, transparent 100%)'
  }}
/> */}
      </div>
    </div>
  );
};

export const FadeBorder = ({ className = "", height = "" }) => {
  return (
    <div className={className}>
      <div className="h-full flex items-center justify-center  ">
        <div
          className={classNames(
            "w-px bg-gradient-to-b from-transparent via-black to-transparent",
            height
          )}
        />
        {/* <div 
          className="w-px h-96" 
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgb(34 197 94) 30%, rgb(34 197 94) 70%, transparent 100%)'
          }}
        /> */}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [agentDescription, setAgentDescription] = useState("");

  return (
    <div className="min-h-screen  text-white font-mono">
      <div className="pt-4">
        <NavBar sticky />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center relative ">
        <div className="h-[calc(100vh-5rem)] flex w-full flex-col items-center justify-center relative ">
          <div className="relative">
            <CrossSvg className="absolute -top-3 -left-3" />
            <CrossSvg className="absolute -bottom-3 -right-3" />
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 relative z-10 text-center leading-tight text-primary">
              Automate DevRel with AI Agents
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-center text-textHeading mb-12 sm:mb-16 tracking-wide z-10 max-w-3xl px-4">
            Turn your DevRel chaos into harmony. Meet your AI-powered team that replies to GitHub
            issues in seconds, reviews PRs like a pro, and keeps your docs pitch-perfect.
          </p>

          <div className="block text-lg font-bold text-center text-black mb-2">
            Compose Your Perfect DevRel Maestro!
          </div>
          <div className="w-full relative">
            <div className="w-full absolute flex overflow-hidden items-center z-0">
              {Array.from({ length: 100 }).map((_, index) => (
                <img
                  key={index}
                  src={horizontalLines}
                  alt="Repeating pattern"
                  className="h-72 flex-none"
                />
              ))}
            </div>

            <div className="w-full max-w-3xl mx-auto px-4 z-10">
              <div className=" bg-secondary h-64 flex items-center p-4 relative">
                <CrossSvg className="absolute -top-3 -left-3" />
                <CrossSvg className="absolute -top-3 -right-3" />
                <FadeBorder className="absolute left-0 top-0 h-full" height=" h-[12rem]" />
                <FadeBorder className="absolute right-0 top-0 h-full" height=" h-[12rem]" />
                <FadeBorderHorizontal className="absolute top-0  w-full" />
                <FadeBorderHorizontal className="absolute bottom-0  w-full" />
                <textarea
                  id="agent-description"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  style={{ outline: "none" }}
                  className="w-full min-h-[100px] sm:min-h-[120px] bg-secondary  bg-opacity-50 border-none h-full rounded 
    text-black placeholder-gray-400 p-3  
    transition-colors duration-200 text-sm sm:text-base resize-none"
                  placeholder="Example: I want an AI Agent with a quirky sense of humor for code issues on Telegram and a no-nonsense attitude for tackling GitHub queries. Think Mozart meets Linus Torvalds"
                />
                <CrossSvg className="absolute -bottom-3 -left-3" />
                <CrossSvg className="absolute -bottom-3 -right-3" />
              </div>
            </div>

            <section className="w-full max-w-3xl mx-auto px-4 relative mb-24 z-10">
              <div className="text-center flex items-center justify-center -mt-7">
                <Link
                  to={`/generate?prompt=${encodeURIComponent(agentDescription)}`}
                  className="block"
                >
                  <button className="bg-primary border rounded-full px-8 py-4 flex items-center justify-center gap-2">
                    <span className="text-white transition-colors duration-300">Compose Agent</span>
                  </button>
                </Link>
              </div>
            </section>
          </div>
          <div className="flex justify-self-end align-bottom w-full absolute bottom-0">
            <VerticalBars />
          </div>
        </div>
        <div className="w-full bg-primary">
          <ChatNavigationCards />
        </div>

        <ProductFeatures />

        <section className="relative overflow-hidden mx-auto bg-gradient-to-b from-bgPrimary via-secondary to-secondary h-full w-full">
          <div className="mb-32 h-full">
            <PlatformIntegrations />
          </div>
          <RoadMap />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;

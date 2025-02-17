// import { Link } from "react-router-dom";
import RoadMap from "./RoadMap";
import NavBar from "./layout/NavBar";
// import { memo, useMemo, useState } from "react";
import Footer from "./Footer";
import ProductFeatures from "./ProductFeatures";
import PlatformIntegrations from "./PlatformIntegrations";
import ChatNavigationCards from "./ChatNavigationCards";
import classNames from "classnames";
import UseCaseCard from "./UseCases";
// import horizontalLines from "../assets/hr.svg";

// import VerticalBars from "./SpacedBars";
// import PianoKeys from "./PianoKeys";

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
        <path d="M10.5 0V21" stroke="#0a0e17" stroke-width="3" />
        <path d="M0 10.5L21 10.5" stroke="#0a0e17" stroke-width="3" />
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
  // const [agentDescription, setAgentDescription] = useState("");

  return (
    <div className="min-h-screen  text-white font-mono">
      <div className="pt-4">
        <NavBar sticky />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center relative ">
        <div className="h-[calc(100vh-4rem)] flex w-full flex-col items-center justify-center relative ">
          {/* <div className="relative mt-16 2xl:mt-0">
            <CrossSvg className="absolute -top-3 -left-3" />
            <CrossSvg className="absolute -bottom-3 -right-3" />
            <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-2 sm:mb-4 relative z-10 text-center leading-tight text-primary">
              Intelligent Community & Knowledge Assistant
            </h1>
          </div> */}

          {/* <p className="text-sm sm:text-base md:text-lg text-center text-textHeading mb-12 sm:mb-16 tracking-wide z-10 max-w-3xl px-4">
            Transform your technical documentation and community engagement with AI agents powered
            insights and support
          </p> */}
          <div className="z-10">
            <ChatNavigationCards />
          </div>
          {/* <div className="flex justify-self-end align-bottom w-full absolute bottom-0">
         
            {verticalBars}
          </div> */}
        </div>
        {/* <div className="w-full bg-primary">
          <ChatNavigationCards />
        </div> */}
        {/* 
        <ProductFeatures />

        <section className="relative overflow-hidden mx-auto bg-gradient-to-b from-bgPrimary via-secondary to-secondary h-full w-full">
          <div className="mb-32 h-full">
            <PlatformIntegrations />
          </div>
          <RoadMap />
        </section>
        <div className="w-full max-w-7xl">
          <UseCaseCard />
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;

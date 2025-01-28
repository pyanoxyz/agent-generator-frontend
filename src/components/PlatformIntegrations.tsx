import React from "react";
import { BsGithub, BsDiscord, BsTelegram, BsCode } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

interface IntegrationItemProps {
  Icon: React.ElementType;
  name: string;
}

const WhiteHrLine = () => {
  return (
    <svg width="2" height="351" viewBox="0 0 2 351" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0V351" stroke="url(#paint0_linear_4_187)" />
      <defs>
        <linearGradient
          id="paint0_linear_4_187"
          x1="1.5"
          y1="0"
          x2="1.5"
          y2="351"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.494438" stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const IntegrationItem: React.FC<IntegrationItemProps> = ({ Icon, name }) => {
  return (
    <div className="flex items-center gap-2 py-2 hover:opacity-80 transition-opacity cursor-pointer">
      <Icon className="w-7 h-7 text-white" />
      <span className="text-white text-lg">{name}</span>
    </div>
  );
};

const PlatformIntegrations: React.FC = () => {
  const platforms = [
    {
      Icon: BsGithub,
      name: "GitHub",
    },
    {
      Icon: FaXTwitter,
      name: "Twitter",
    },
    {
      Icon: BsDiscord,
      name: "Discord",
    },
    {
      Icon: BsTelegram,
      name: "Telegram",
    },
    {
      Icon: BsCode,
      name: "API",
    },
  ];

  return (
    <section className="relative h-72">
      <div className="max-w-4xl relative flex items-center z-[2] flex-col justify-center h-full mx-auto px-4  bg-primary">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-white bg-clip-text text-transparent">
            Seamless Integration
          </h2>
          <p className="text-white text-lg">
            Connect with all your development and community platforms
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-16 gap-y-4 ">
          {platforms.map((platform, index) => (
            <IntegrationItem key={index} Icon={platform.Icon} name={platform.name} />
          ))}
        </div>
      </div>
      <div className="w-full absolute flex items-center h-full top-0 z-[1]">
        {Array.from({ length: 800 }).map((_) => (
          <div className="mx-1 -z-10">
            <WhiteHrLine />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformIntegrations;

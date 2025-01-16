import React from "react";
import { BsGithub, BsDiscord, BsTelegram, BsCode } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

interface IntegrationItemProps {
  Icon: React.ElementType;
  name: string;
}

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
    <section className="mb-24">
      <div className="max-w-4xl mx-auto px-4">
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
    </section>
  );
};

export default PlatformIntegrations;

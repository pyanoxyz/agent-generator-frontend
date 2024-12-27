import React, { useState } from "react";
import { FaChevronRight as ChevronRight } from "react-icons/fa";
import {
  FaRobot,
  FaUserEdit,
  FaGlobe,
  FaTwitter,
  FaDiscord,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import FormPage from "./CreateAgentForm";

const SAMPLE_AGENTS = [
  {
    name: "Eliza",
    description: "Pioneering AI therapist with empathetic communication",
    personality: "Analytical, compassionate, probing",
    image:
      "https://i0.wp.com/www.opindia.com/wp-content/uploads/2023/04/191.png?fit=696%2C539&ssl=1",
  },
  {
    name: "Trump Bot",
    description: "Controversial political personality simulator",
    personality: "Confident, direct, provocative",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTniFlQhilwKOtoKmbN6bVr2HrsWmTccv6YEO-UUG33GJ9WcUiPaL28bAR2rfzWLFKkFJw&usqp=CAU",
  },
  {
    name: "Dobby Assistant",
    description: "Helpful AI inspired by the beloved house-elf",
    personality: "Loyal, eager to help, quirky",
    image:
      "https://images.nightcafe.studio/jobs/XxZv2aDHybMHByrJgKD0/XxZv2aDHybMHByrJgKD0--1--gdxva.jpg?tr=w-1600,c-at_max",
  },
];

const FEATURES = [
  {
    icon: <FaRobot className="text-white text-4xl" />,
    title: "Custom AI Agents",
    description: "Create unique AI personalities tailored to your needs",
  },
  {
    icon: <FaUserEdit className="text-white text-4xl" />,
    title: "Detailed Customization",
    description:
      "Define personality, style, knowledge, and communication traits",
  },
  {
    icon: <FaGlobe className="text-white text-4xl" />,
    title: "Multi-Platform Support",
    description: "Deploy agents across Twitter, Discord, and more",
  },
];

const FormPageMain = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="">
        <FormPage />
      </div>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Create Custom Agents?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-black/10 border border-gray-800 p-6 rounded-none hover:border-white transition-colors duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Example Agents</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {SAMPLE_AGENTS.map((agent, index) => (
            <div
              key={index}
              className="bg-black/10 border border-gray-800 p-6 rounded-none hover:border-white transition-colors duration-300"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="mx-auto mb-4 rounded-full w-32 h-32"
              />
              <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
              <p className="mb-2 text-gray-400">{agent.description}</p>
              <p className="italic text-gray-500">"{agent.personality}"</p>
            </div>
          ))}
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

export default FormPageMain;

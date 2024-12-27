import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    icon: <FaRobot className="text-brand-green text-4xl" />,
    title: "Custom AI Agents",
    description: "Create unique AI personalities tailored to your needs",
  },
  {
    icon: <FaUserEdit className="text-brand-green text-4xl" />,
    title: "Detailed Customization",
    description:
      "Define personality, style, knowledge, and communication traits",
  },
  {
    icon: <FaGlobe className="text-brand-green text-4xl" />,
    title: "Multi-Platform Support",
    description: "Deploy agents across Twitter, Discord, and more",
  },
];

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-brand-green">
          Create Your Custom AI Agent
        </h1>
        <p className="text-xl mb-10 text-brand-blue max-w-2xl mx-auto">
          Design AI personalities with unique traits, knowledge, and
          communication styles. From therapeutic bots to political simulators,
          bring your AI vision to life.
        </p>
        {showForm ? (
          <FormPage />
        ) : (
          <Link
            //   to="/generate"
            onClick={() => setShowForm(true)}
            className="bg-brand-green text-brand-dark px-8 py-3 rounded-lg text-xl font-bold hover:bg-brand-blue transition-colors"
          >
            Create Agent
          </Link>
        )}
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-brand-green">
          Why Create Custom Agents?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-lg text-center hover:bg-white/10 transition-all"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-brand-green">
                {feature.title}
              </h3>
              <p className="text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Agents Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-brand-green">
          Example Agents
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {SAMPLE_AGENTS.map((agent, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-lg text-center hover:bg-white/10 transition-all"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="mx-auto mb-4 rounded-full w-32 h-32"
              />
              <h3 className="text-xl font-bold mb-2 text-brand-green">
                {agent.name}
              </h3>
              <p className="mb-2 text-white">{agent.description}</p>
              <p className="italic text-brand-blue">"{agent.personality}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">&copy; 2024 Pyano.network</p>
          <div className="flex space-x-4">
            <a href="#" className="text-brand-green hover:text-brand-blue">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-brand-green hover:text-brand-blue">
              <FaDiscord size={24} />
            </a>
            <a href="#" className="text-brand-green hover:text-brand-blue">
              <FaGithub size={24} />
            </a>
            <a href="#" className="text-brand-green hover:text-brand-blue">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

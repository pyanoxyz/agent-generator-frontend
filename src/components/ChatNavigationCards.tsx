import { Link } from "react-router-dom";
import { useState } from "react";
import { RiChatAiLine as ChatIcon } from "react-icons/ri";
import ModeSvg from "../assets/mode.svg";

interface ChatCard {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

const ChatNavigationCards = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const chatCards: ChatCard[] = [
    {
      title: "Mode Network",
      description:
        "Mode is a Layer 2 blockchain scaling DeFi with AIFi, focusing on AI-driven financial automation and low fees.",
      path: "https://mode.pyano.fun",
      icon: <img src={ModeSvg} className="bg-black size-8" />,
    },
    // {
    //   title: "Langchain",
    //   description: "Advanced language model chain for complex reasoning and structured outputs",
    //   path: "/chat-langchain",
    //   icon: "⚡",
    // },
    // {
    //   title: "Langgraph",
    //   description: "Graph-based language processing for interconnected knowledge and relationships",
    //   path: "/chat-langgraph",
    //   icon: "🌐",
    // },
  ];

  return (
    <div className="px-4 py-12 bg-gradient-to-t !m-0 w-full flex items-center justify-center ">
      <div className="max-w-screen-2xl flex flex-col items-center justify-self-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary ">
          Chat with Knowledge Agents
        </h2>
        <div className="flex gap-6">
          {chatCards.map((card) => (
            <Link
              key={card.title}
              to={card.path}
              target="_blank"
              className="group"
              onMouseEnter={() => setHoveredCard(card.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-full max-w-xl bg-bgCards border shadow-xl rounded-lg p-6 transition-all duration-300 hover:border-gray-600 hover:transform hover:-translate-y-1 flex flex-col justify-between">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{card.icon}</span>
                  <h3 className={`text-xl font-bold  text-black bg-clip-text `}>{card.title}</h3>
                </div>
                <p className="text-black mb-4">{card.description}</p>
                <div className="bg-primary p-2 rounded cursor-pointer flex items-center justify-center">
                  <div className={` flex items-center text-sm text-secondary gap-2 `}>
                    Start chatting <ChatIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatNavigationCards;

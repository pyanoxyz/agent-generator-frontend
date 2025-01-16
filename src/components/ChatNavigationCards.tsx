import { Link } from "react-router-dom";
import { useState } from "react";

interface ChatCard {
  title: string;
  description: string;
  path: string;
  icon: string;
}

const ChatNavigationCards = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const chatCards: ChatCard[] = [
    {
      title: "Eliza OS",
      description:
        "An intelligent agent specializing in system-level interactions and technical support",
      path: "/chat/eliza",
      icon: "🤖",
    },
    {
      title: "Langchain",
      description: "Advanced language model chain for complex reasoning and structured outputs",
      path: "/chat/langchain",
      icon: "⚡",
    },
    {
      title: "Langgraph",
      description: "Graph-based language processing for interconnected knowledge and relationships",
      path: "/chat/langgraph",
      icon: "🌐",
    },
  ];

  return (
    <div className=" mx-auto px-4 py-12 bg-gradient-to-t from-bgPrimary via-secondary to-secondary !m-0 w-full ">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-bgPrimary ">
        Choose Your AI Assistant
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatCards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className="group"
            onMouseEnter={() => setHoveredCard(card.title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="h-full bg-bgCards  rounded-lg p-6 transition-all duration-300 hover:border-gray-600 hover:transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{card.icon}</span>
                <h3 className={`text-xl font-bold  text-black bg-clip-text `}>{card.title}</h3>
              </div>
              <p className="text-black mb-4">{card.description}</p>
              <div className={`flex items-center text-sm text-black bg-clip-text  `}>
                <span className="group-hover:underline">Start chatting</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatNavigationCards;

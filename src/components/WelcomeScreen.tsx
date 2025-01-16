import { ClientType } from "../types";
import { TfiArrowTopRight as TopRightArrowIcon } from "react-icons/tfi";

interface WelcomeContentType {
  message: string;
  sampleQuestions: string[];
}

export const WelcomeContent: Record<ClientType, WelcomeContentType> = {
  [ClientType.ELIZA]: {
    message: "Ask anything about Eliza",
    sampleQuestions: ["What is Eliza?", "How does Eliza work?", "Tell me more about Eliza."],
  },
  [ClientType.LANGCHAIN]: {
    message: "Explore LangChain capabilities",
    sampleQuestions: [
      "What is LangChain?",
      "How can LangChain help me?",
      "Show me LangChain examples.",
    ],
  },
  [ClientType.LANGGRAPH]: {
    message: "Learn more about LangGraph",
    sampleQuestions: [
      "What is LangGraph?",
      "How to use LangGraph?",
      "Benefits of using LangGraph?",
    ],
  },
} as const;

interface SuggestionButtonProps {
  text: string;
  onClick: (message: string) => void;
}

const SuggestionButton = ({ text, onClick }: SuggestionButtonProps) => (
  <button
    onClick={() => onClick(text)}
    className="flex items-end justify-center gap-2 px-4 py-2 text-gray-600 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
  >
    <span className="text-sm font-medium">{text}</span>
    <TopRightArrowIcon />
  </button>
);

interface WelcomeScreenProps {
  onClick: (message: string) => void;
  clientType: ClientType;
}

const WelcomeScreen = ({ onClick, clientType }: WelcomeScreenProps) => {
  const content = WelcomeContent[clientType];

  if (!content) {
    throw new Error(`Invalid client type: ${clientType}`);
  }

  const { message, sampleQuestions } = content;

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-700 text-center">{message}</h1>

      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {sampleQuestions.map((question: string, index: number) => (
          <SuggestionButton key={index} text={question} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;

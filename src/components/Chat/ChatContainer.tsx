import { MessageRole } from "../../constants/messageRoles";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import useAutoScroll from "../../hooks/useAutoScroll";
import ScrollToBottomButton from "./ScrollToBottom";
import WelcomeScreen from "../WelcomeScreen";
import { useChat } from "../../hooks/useChat";
import { v4 as uuidv4 } from "uuid";
import { ClientType } from "../../types";

interface ChatContainerProps {
  clientType: ClientType;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ clientType }) => {
  const { messages, setMessages } = useChat();
  const { scrollRef, manualScrollToBottom, showScrollToBottom } = useAutoScroll();

  const handleMessage = async (message: string) => {
    try {
      const userMessageId = uuidv4();
      const assistantMessageId = uuidv4();
      const data = {
        prompt: message,
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: userMessageId,
          role: MessageRole.USER,
          content: message,
          show: true,
        },
        {
          id: assistantMessageId,
          role: MessageRole.ASSISTANT,
          content: "",
          apiData: data,
          isStreaming: true,
          hasStreamStarted: false,
          show: true,
        },
      ]);
      manualScrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-secondary items-center relative">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-4xl break-words mx-auto"
      >
        <div className="h-full">
          {messages.length === 0 ? (
            <WelcomeScreen onClick={handleMessage} clientType={clientType} />
          ) : (
            <>
              <MessageList messages={messages} clientType={clientType} />
              <ScrollToBottomButton show={showScrollToBottom} onClick={manualScrollToBottom} />
            </>
          )}
        </div>
      </div>
      <ChatInput onSendMessage={handleMessage} />
    </div>
  );
};

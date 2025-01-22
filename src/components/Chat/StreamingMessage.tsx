import React, { useEffect, useRef, useState } from "react";
import { ClientType, MessageType } from "../../types";
import { useDevrelChat } from "../../context/DevrelChatContext";
import { MessageRole } from "../../constants/messageRoles";
import MarkdownRenderer from "./MarkdownRenderer";
import { LoadingDots } from "../common/LoadingDots";

interface StreamingMessageProps {
  message: MessageType;
  onStreamComplete?: (content: string) => void;
  clientType: ClientType;
}

export const StreamingMessage: React.FC<StreamingMessageProps> = ({
  message,
  onStreamComplete,
  clientType,
}) => {
  const { chat } = useDevrelChat();
  const [streamedContent, setStreamedContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isUser = message.role === MessageRole.USER;
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    const handleStreaming = async () => {
      try {
        if (!message.apiData?.prompt) {
          console.warn("No prompt provided");
          return;
        }

        const response = await chat(message.apiData.prompt, clientType);
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        if (!reader) {
          throw new Error("No reader available");
        }

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          // Decode the received chunk
          const chunk = decoder.decode(value);

          accumulated += chunk;
          setStreamedContent(accumulated);
        }

        if (onStreamComplete) {
          onStreamComplete(accumulated);
        }
      } catch (error) {
        console.error("Streaming error:", error);
        setStreamedContent(
          error instanceof Error ? error.message : "An error occurred while streaming the response."
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleStreaming();
  }, []);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-3xl p-3 bg-bgCards text-black`}>
        {isLoading && !streamedContent && (
          <div className="flex justify-center items-center min-h-[40px]">
            <LoadingDots />
          </div>
        )}
        <div className={`whitespace-pre-wrap markdown-content transition-opacity`}>
          <MarkdownRenderer content={streamedContent} />
        </div>
      </div>
    </div>
  );
};

export default StreamingMessage;

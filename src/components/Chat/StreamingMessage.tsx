import React, { useEffect, useRef, useState } from "react";
import { MessageType } from "../../types";
import { useGradio } from "../../context/GradioContext";
import { MessageRole } from "../../constants/messageRoles";
import MarkdownRenderer from "./MarkdownRenderer";
import { LoadingDots } from "../common/LoadingDots";

interface StreamingMessageProps {
  message: MessageType;
  onStreamComplete?: (content: string) => void;
}

export const StreamingMessage: React.FC<StreamingMessageProps> = ({
  message,
  onStreamComplete,
}) => {
  const { chat } = useGradio();
  const [streamedContent, setStreamedContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isUser = message.role === MessageRole.USER;
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    const handleStreaming = async () => {
      try {
        const response = await chat(message.apiData?.prompt);
        let accumulated = "";

        for await (const output of response) {
          if (output.data?.[0]?.[0]?.[0] === "append") {
            const newContent = output.data[0][0][2];
            accumulated += newContent;
            setStreamedContent(accumulated);
          } else if (output.data?.[0] && typeof output.data[0] === "string") {
            accumulated = output.data[0];
            setStreamedContent(accumulated);
          }
        }

        if (onStreamComplete) {
          onStreamComplete(accumulated);
        }
      } catch (error) {
        console.error("Streaming error:", error);
        setStreamedContent("An error occurred while streaming the response.");
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
        <div className={`whitespace-pre-wrap markdown-content  transition-opacity`}>
          <MarkdownRenderer content={streamedContent}></MarkdownRenderer>
        </div>
      </div>
    </div>
  );
};

export default StreamingMessage;

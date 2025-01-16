import { useState } from "react";
import { MessageType } from "../types";

export const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  return {
    messages,
    setMessages,
  };
};

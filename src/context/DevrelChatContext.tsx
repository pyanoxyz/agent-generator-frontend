import { AGENT_URLS, ClientType } from "../types";
import { createContext, useContext, ReactNode } from "react";

interface DevrelChatContextType {
  chat: (message: string, clientType: ClientType) => Promise<Response>;
}

const DevrelChatContext = createContext<DevrelChatContextType | null>(null);

export const DevrelChatProvider = ({ children }: { children: ReactNode }) => {
  const chat = async (message: string, clientType: ClientType) => {
    const baseUrl = AGENT_URLS[clientType];
    if (!baseUrl) {
      throw new Error(`No URL configured for client type: ${clientType}`);
    }

    const response = await fetch(`${baseUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        message,
        history: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message to ${clientType} agent`);
    }

    return response;
  };

  return (
    <DevrelChatContext.Provider
      value={{
        chat,
      }}
    >
      {children}
    </DevrelChatContext.Provider>
  );
};

export const useDevrelChat = () => {
  const context = useContext(DevrelChatContext);
  if (!context) {
    throw new Error("useDevrelChat must be used within a DevrelChatProvider");
  }
  return context;
};

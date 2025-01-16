import { createContext, useContext, useState, ReactNode } from "react";
import { Client } from "@gradio/client";
import { AGENT_URLS, ClientType } from "../types";

interface GradioContextType {
  //   client: any | null;
  initializeClient: (client: ClientType) => void;
  isConnecting: boolean;
  error: Error | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chat: (message: string) => Promise<AsyncIterable<any>>;
}

const GradioContext = createContext<GradioContextType | null>(null);

export const GradioProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [client, setClient] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initializeClient = async (agent: ClientType) => {
    console.log("loading configs");
    setIsConnecting(true);
    setError(null);
    try {
      const gradioClient = await Client.connect(AGENT_URLS[agent], {
        events: ["data", "status"],
      });
      setClient(gradioClient);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to connect to Gradio"));
    } finally {
      setIsConnecting(false);
    }
  };

  const chat = async (message: string) => {
    if (!client) {
      throw new Error("Agent is offline");
    }

    const result = await client.submit("/chat", [message], {
      event_data: true,
      fn_index: 0,
    });
    return result;
  };

  return (
    <GradioContext.Provider
      value={{
        // client,
        initializeClient,
        isConnecting,
        error,
        chat,
      }}
    >
      {children}
    </GradioContext.Provider>
  );
};

export const useGradio = () => {
  const context = useContext(GradioContext);
  if (!context) {
    throw new Error("useGradio must be used within a GradioProvider");
  }
  return context;
};

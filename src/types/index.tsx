import { MessageRole } from "../constants/messageRoles";

export interface MessageType {
  id: string;
  content: string;
  isStreaming?: boolean;
  hasStreamed?: boolean;
  show: boolean;
  role: MessageRole;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiData?: Record<string, any>;
  api?: string;
}

export enum ClientType {
  ELIZA = "eliza",
  LANGCHAIN = "langchain",
  LANGGRAPH = "langgraph",
}

export const AGENT_URLS = {
  [ClientType.ELIZA]: "http://52.207.112.17",
  [ClientType.LANGCHAIN]: "http://44.194.59.7",
  [ClientType.LANGGRAPH]: "http://44.198.9.179",
};

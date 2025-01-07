export interface MessageExample {
  user: string;
  content: {
    text: string;
  };
}

export interface Character {
  name: string;
  modelProvider: string;
  clients: string[];
  bio: string[];
  lore: string[];
  knowledge: string[];
  messageExamples: MessageExample[][];
  postExamples: string[];
  topics: string[];
  style: {
    all: string[];
    chat: string[];
    post: string[];
  };
  adjectives: string[];
}

export interface AgentKnowledge {
  filename: string;
  content_type: string;
  s3_url: string;
}

export interface Agent {
  agent_id: string;
  address: string;
  bio: string[];
  character: Character;
  character_s3_url: string;
  created_at: string;
  knowledge: AgentKnowledge[];
  status: "running" | "stopped";
  version: string;
}

export interface AgentListResponse {
  address: string;
  agents: Agent[];
}
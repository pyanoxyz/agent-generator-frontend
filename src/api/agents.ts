import { AgentListResponse } from "../components/Agents/agents";

export const API_BASE_URL = "https://api.pyano.fun/api/v1";

export const fetchAgents = async (address: string): Promise<AgentListResponse> => {
  const response = await fetch(`${API_BASE_URL}/agent/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch agents");
  }

  return response.json();
};

export const shutdownAgent = async (
  agentId: string,
  signature: string,
  message: string,
  public_key: string
): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/agent/shutdown`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: agentId,
      message,
      signature,
      public_key,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to shutdown agent");
  }

  return response.json();
};

export const fetchAgentLogs = async (agentId: string): Promise<LogsResponse> => {
  const response = await fetch(`${API_BASE_URL}/agent/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agent_id: agentId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch agent logs");
  }

  return response.json();
};

interface LogsResponse {
  success: boolean;
  message: string;
  logs: string;
}

export const startAgent = async (
  agentId: string,
  signature: string,
  message: string,
  public_key: string
) => {
  try {
    const apiUrl = `${API_BASE_URL}/agent/start`;
    const requestBody = {
      agent_id: agentId,
      signature,
      message,
      public_key,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to start agent: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

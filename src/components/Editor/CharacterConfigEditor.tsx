import React, { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useAccount } from "wagmi";
import { AUTH_MESSAGE, useAuth } from "../../hooks/useAuth";
import { base } from "wagmi/chains";
import ClientCredentialsForm from "./ClientCredentialsForm";
import KnowledgeProcessor from "./KnowledgeUpload";
import { Character } from "../Agents/agents";
import { EditorHeader } from "./EditorHeader";
import { Tooltip } from "../common/Tooltip";
import { ClientSelector } from "./ClientSelector";
import { BasicInfo } from "./BasicInfo";
import DeploymentStatus from "./DeploymentStatus";

export interface TwitterCredentials {
  username: string;
  password: string;
  email: string;
}

export interface DiscordCredentials {
  DISCORD_APPLICATION_ID: string;
  DISCORD_API_TOKEN: string;
}

export interface TelegramCredentials {
  TELEGRAM_BOT_TOKEN: string;
}

// Combined interface for all client credentials
export interface ClientCredentials {
  client_twitter?: TwitterCredentials;
  client_discord?: DiscordCredentials;
  client_telegram?: TelegramCredentials;
}

const CharacterConfigEditor = ({
  initialConfig,
}: {
  initialConfig: Character;
}) => {
  const [config, setConfig] = useState<Character>(initialConfig);
  const showToast = useToast((state) => state.showToast);
  const { isConnected, chain } = useAccount();
  const { isAuthenticated, clearAuth } = useAuth();
  const { signIn } = useAuth();
  const [showClientCredentials, setShowClientCredentials] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentSignature, setDeploymentSignature] = useState<string | null>(
    null
  );
  const [deploymentStatus, setDeploymentStatus] = useState<
    "loading" | "success" | "error" | null
  >(null);
  const [deploymentError, setDeploymentError] = useState<string | undefined>();

  const [knowledgeFiles, setKnowledgeFiles] = useState<File[]>([]);

  const handleFileAdd = (file: File) => {
    setKnowledgeFiles((prev) => [...prev, file]);
  };

  const handleFileRemove = (index: number) => {
    setKnowledgeFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (isConnected && chain?.id === base.id && isAuthenticated) {
      setShowClientCredentials(true);
    } else {
      setShowClientCredentials(false);
    }
  }, [isConnected, chain?.id, isAuthenticated]);

  const handleDeploy = async () => {
    if (isDeploying) return;

    if (!isConnected || chain?.id !== base.id) {
      showToast("Connect wallet and switch to Base network", "error");
      return;
    }

    setIsDeploying(true);

    try {
      // Get user signature
      const signature = await signIn();

      setDeploymentSignature(signature);
      setShowClientCredentials(true);
      showToast("Wallet verified successfully!", "success");
    } catch (error) {
      console.error("Deployment initiation failed:", error);
      setIsDeploying(false);
      clearAuth();
    }
  };

  const handleCredentialsSubmit = async (credentials: ClientCredentials) => {
    if (!deploymentSignature) {
      showToast("No signature found. Please try again.", "error");
      return;
    }

    try {
      const formData = new FormData();

      // Create character file from config
      const characterFile = new File(
        [JSON.stringify(config)],
        "character.json",
        { type: "application/json" }
      );
      formData.append("character", characterFile);

      if (knowledgeFiles.length > 0) {
        knowledgeFiles.forEach((file) => {
          formData.append("knowledge_files", file, file.name);
        });
      }
      // Add authentication data
      formData.append("signature", deploymentSignature);
      formData.append("message", AUTH_MESSAGE);


      // In handleCredentialsSubmit:
      if (credentials.client_twitter) {
        try {
          formData.append(
            "client_twitter",
            JSON.stringify({
              username: credentials.client_twitter.username,
              password: credentials.client_twitter.password,
              email: credentials.client_twitter.email,
            })
          );
        } catch (error) {
          showToast(
            error instanceof Error
              ? error.message
              : "Invalid Twitter credentials",
            "error"
          );
          return;
        }
      }

      if (credentials.client_discord) {
        formData.append(
          "client_discord",
          JSON.stringify({
            discord_application_id:
              credentials.client_discord.DISCORD_APPLICATION_ID,
            discord_api_token: credentials.client_discord.DISCORD_API_TOKEN,
          })
        );
      }

      if (credentials.client_telegram) {
        formData.append(
          "client_telegram",
          JSON.stringify({
            telegram_bot_token: credentials.client_telegram.TELEGRAM_BOT_TOKEN,
          })
        );
      }

      setDeploymentStatus("loading");

      const response = await fetch(
        "https://verbally-busy-polliwog.ngrok-free.app/api/v1/agent/deploy",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(errorText);
      }

      const result = await response.json();
      console.log("Deployment successful:", result);

      setDeploymentSignature(null);
      clearAuth();
      setDeploymentStatus("success");
      showToast("Agent deployed successfully!", "success");
      setShowClientCredentials(false);
    } catch (error) {
      console.error("Deployment failed:", error);
      setDeploymentStatus("error");
      setDeploymentError(
        error instanceof Error ? error.message : "Failed to deploy agent"
      );
      showToast("Failed to deploy agent", "error");
    } finally {
      setIsDeploying(false);
    }
  };

  const updateField = (path: string, value: any) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig as any;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  const handleStringArrayChange = (
    path: string,
    index: number,
    value: string
  ) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig as any;
    for (const key of keys) {
      current = current[key];
    }
    current[index] = value;
    setConfig(newConfig);
  };

  const addStringArrayItem = (path: string) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig as any;
    for (const key of keys) {
      current = current[key];
    }
    current.push("");
    setConfig(newConfig);
  };

  const removeStringArrayItem = (path: string, index: number) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig as any;
    for (const key of keys) {
      current = current[key];
    }
    current.splice(index, 1);
    setConfig(newConfig);
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    showToast("Configuration copied to clipboard!", "success");
  };

  const handleDownloadConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "character-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBackFromDeployment = () => {
    setDeploymentStatus(null);
    setDeploymentError(undefined);
    setShowClientCredentials(false);
    setDeploymentSignature(null);
    clearAuth();
  };

  const renderStringArrayField = (
    label: string,
    path: string,
    array: string[],
    tooltip?: React.ReactNode
  ) => (
    <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
      <label className="flex gap-1 text-lg font-medium text-blue-500 mb-4">
        {label}
        {tooltip && <Tooltip tooltip={tooltip} />}
      </label>
      <div className="space-y-3">
        {array.map((item, index) => (
          <div key={index} className="group relative">
            <textarea
              value={item}
              onChange={(e) =>
                handleStringArrayChange(path, index, e.target.value)
              }
              className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-gray-200 min-h-[60px] resize-y text-sm leading-relaxed focus:border-blue-500/50 outline-none transition-colors pr-12"
              placeholder={`Enter ${label.toLowerCase()} item`}
            />
            <button
              onClick={() => removeStringArrayItem(path, index)}
              className="absolute top-1/2 -translate-y-1/2 right-3 h-8 w-8 flex items-center justify-center text-red-500 hover:text-red-400 border border-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/50"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => addStringArrayItem(path)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:text-blue-400 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-colors"
        >
          + Add {label} Item
        </button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto space-y-6 mb-10 rounded-lg">
      <EditorHeader
        onDeploy={handleDeploy}
        onCopy={handleCopyConfig}
        onDownload={handleDownloadConfig}
      />

      {deploymentStatus ? (
        <DeploymentStatus
          status={deploymentStatus}
          error={deploymentError}
          onBack={handleBackFromDeployment}
        />
      ) : showClientCredentials ? (
        <ClientCredentialsForm
          onSubmit={handleCredentialsSubmit}
          selectedClients={config.clients}
        />
      ) : (
        <div className="space-y-6">
          <BasicInfo
            name={config.name}
            // modelProvider={config.modelProvider}
            onNameChange={(value) => updateField("name", value)}
          />
          <ClientSelector
            selectedClient={config.clients[0]}
            onClientChange={(client) => updateField("clients", [client])}
          />
          {renderStringArrayField(
            "Bio",
            "bio",
            config.bio,
            <div>
              Contains biographical information about the character <br />
              Can be a single comprehensive biography or multiple shorter
              statements
              <br />
              Multiple statements are randomized to create variety in responses
            </div>
          )}
          {renderStringArrayField(
            "Lore",
            "lore",
            config.lore,
            <div>
              Backstory elements and unique character traits. <br /> These help
              define personality and can be randomly sampled in conversations.
            </div>
          )}
          {renderStringArrayField(
            "Knowledge",
            "knowledge",
            config.knowledge,
            <div>
              Can contain chunks of text from articles, books, or other sources{" "}
              <br />
              Helps ground the character's responses in factual information{" "}
              <br />
              Knowledge can be generated from PDFs or other documents using
              provided tools
            </div>
          )}
          {renderStringArrayField(
            "Topics",
            "topics",
            config.topics,
            <div>
              List of subjects the character is interested in or knowledgeable
              about <br />
              Used to guide conversations and generate relevant content
              <br />
              Helps maintain character consistency
            </div>
          )}
          {renderStringArrayField(
            "Post Examples",
            "postExamples",
            config.postExamples,
            "Sample social media posts to guide content style:"
          )}
          {renderStringArrayField(
            "Style All",
            "style.all",
            config.style.all,
            "General style instructions for all interactions"
          )}
          {renderStringArrayField(
            "Style Chat",
            "style.chat",
            config.style.chat,
            "Specific instructions for chat interactions"
          )}
          {renderStringArrayField(
            "Style Post",
            "style.post",
            config.style.post,
            "Specific instructions for social media posts"
          )}
          {renderStringArrayField(
            "Adjectives",
            "adjectives",
            config.adjectives,
            <div>
              Words that describe the character's traits and personality <br />
              Used for generating responses with consistent tone <br />
              Can be used in "Mad Libs" style content generation
            </div>
          )}
          <KnowledgeProcessor
            files={knowledgeFiles}
            onFileAdd={handleFileAdd}
            onFileRemove={handleFileRemove}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterConfigEditor;

import {  useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useAccount } from "wagmi";
import { AUTH_MESSAGE, useAuth } from "../../hooks/useAuth";
import ClientCredentialsForm from "./ClientCredentialsForm";
import KnowledgeProcessor from "./KnowledgeUpload";
import { Character } from "../Agents/agents";
import { EditorHeader } from "./EditorHeader";
import { ClientSelector } from "./ClientSelector";
import { BasicInfo } from "./BasicInfo";
import DeploymentStatus from "./DeploymentStatus";
import { API_BASE_URL } from "../../api/agents";
import { ClientCredentials } from "./types";
import CharacterFields from "./Chracterfields";

const CharacterConfigEditor = ({
  initialConfig,
}: {
  initialConfig: Character;
}) => {
  const [config, setConfig] = useState<Character>(initialConfig);
  const showToast = useToast((state) => state.showToast);
  const { isConnected } = useAccount();
  const { signIn ,isNetworkSupported} = useAuth();
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


  const handleDeploy = async () => {
    if (isDeploying) return;

    if (!isConnected ) {
      showToast("Connect wallet and switch to Base network", "error");
      return;
    }

    if (!isNetworkSupported()) {
      showToast("Please switch to a supported network", "error");
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
        `${API_BASE_URL}/agent/deploy`,
        {
        method: "POST",
        body: formData,
      }
    );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error(errorData.detail || "Failed to deploy agent");
      }

      const result = await response.json();
      console.log("Deployment successful:", result);

      setDeploymentSignature(null);
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
  };

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
            selectedClient={config.clients?.[0]}
            onClientChange={(client) => updateField("clients", [client])}
          />
          <CharacterFields config={config} setConfig={setConfig} />
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

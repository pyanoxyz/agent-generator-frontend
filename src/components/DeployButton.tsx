import { useAccount } from "wagmi";
import { useToast } from "../hooks/useToast";
import { base } from "wagmi/chains";
import { useAuth } from "../hooks/useAuth";
import { CharacterConfig } from "./CharacterConfigEditor";
import { useState } from "react";
import { ClientCredentialsForm } from "./ClientCredentialsForm";

interface Props {
  config: CharacterConfig;
}

interface TwitterCredentials {
  username: string;
  password: string;
}

export interface ClientCredentials {
  twitter?: TwitterCredentials;
  discord?: {
    username: string;
    password: string;
  };
  telegram?: string;
}

const DeployButton = ({ config }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const { signIn } = useAuth();
  const showToast = useToast((state) => state.showToast);
  const { isConnected, chain } = useAccount();

  const handleDeploy = async (credentials: ClientCredentials) => {
    if (!isConnected || chain?.id !== base.id) {
      showToast("Connect wallet and switch to Base network", "error");
      return;
    }
    try {
      const signature = await signIn();
      const formData = new FormData();
      formData.append("character", JSON.stringify(config));
      formData.append("signature", signature);
      formData.append("message", `Deploy agent\nTimestamp: ${Date.now()}`);

      if (credentials.twitter) {
        formData.append("client_twitter", JSON.stringify(credentials.twitter));
      }
      if (credentials.discord) {
        formData.append("client_discord", JSON.stringify(credentials.discord));
      }
      if (credentials.telegram) {
        formData.append("client_telegram", credentials.telegram);
      }

      const response = await fetch("/deploy", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();

      showToast("Agent deployed successfully!", "success");
      setShowForm(false);
    } catch (error) {
      showToast("Failed to deploy agent", "error");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
      >
        Deploy
      </button>
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-black/90 p-6 rounded-lg w-96">
            <ClientCredentialsForm
              selectedClient={config.clients[0]}
              onSubmit={handleDeploy}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeployButton;
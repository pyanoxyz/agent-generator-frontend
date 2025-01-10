import { Tooltip } from "../common/Tooltip";

const CLIENT_TYPES = ["twitter", "discord", "telegram"];


interface ClientSelectorProps {
    selectedClient: string;
    onClientChange: (client: string) => void;
  }
  
  export const ClientSelector: React.FC<ClientSelectorProps> = ({
    selectedClient = CLIENT_TYPES[0],
    onClientChange,
  }) => (
    <div>
      <label className="flex gap-1 text-lg font-medium text-blue-500">
        Client
        <Tooltip tooltip="Select a client for your agent" />
      </label>
      <div className="flex flex-wrap gap-2 mt-2">
        {CLIENT_TYPES.map((client) => (
          <button
            key={client}
            onClick={() => onClientChange(client)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedClient === client
                ? "border-blue-500 bg-blue-500/20 text-blue-400"
                : "border-gray-700 bg-black/50 text-gray-400 hover:border-blue-500/50"
            }`}
          >
            {client}
          </button>
        ))}
      </div>
    </div>
  );
  
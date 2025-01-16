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
  <div className="p-4 rounded-lg border border-borderPrimary">
    <label className="flex gap-1 text-lg font-medium text-primary">
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
              ? "text-secondary bg-primary "
              : "border-primary bg-secondary text-primary "
          }`}
        >
          {client}
        </button>
      ))}
    </div>
  </div>
);

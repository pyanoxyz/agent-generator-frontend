import { Tooltip } from "../common/Tooltip";


interface BasicInfoProps {
    name: string;
    // modelProvider: string;
    onNameChange: (value: string) => void;
  }
  
  export const BasicInfo: React.FC<BasicInfoProps> = ({
    name,
    // modelProvider,
    onNameChange,
  }) => (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
        <label className="flex gap-1 text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Name <Tooltip tooltip="Name of your agent" />
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-white focus:border-blue-500/50 outline-none transition-colors"
          placeholder="Enter agent name..."
        />
      </div>
      {/* <div className="bg-black/30 p-4 rounded-lg border border-gray-800 opacity-75">
        <label className="flex gap-1 text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Model Provider
          <Tooltip tooltip="Default model is Together AI" />
        </label>
        <select
          value={modelProvider}
          disabled
          className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-white cursor-not-allowed"
        >
          <option value="together">together</option>
        </select>
      </div> */}
    </div>
  );
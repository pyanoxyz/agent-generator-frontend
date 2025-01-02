import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import cn from "classnames";
import DeployButton from "./DeployButton";

const MODEL_PROVIDERS = [
  "openai",
  "eternalai",
  "anthropic",
  "grok",
  "groq",
  "llama_cloud",
  "together",
  "llama_local",
  "google",
  "claude_vertex",
  "redpill",
  "openrouter",
  "ollama",
  "heurist",
  "galadriel",
  "falai",
  "gaianet",
  "ali_bailian",
  "volengine",
  "nanogpt",
  "hyperbolic",
  "venice",
  "akash_chat_api",
];

const CLIENT_TYPES = ["twitter", "discord", "telegram"];

const Tooltip = ({
  tooltip,
  className,
}: {
  tooltip: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative group flex items-center", className)}>
      <FaInfoCircle className="text-gray-400 group-hover:text-gray-200 size-3.5" />
      <span className="absolute bottom-full z-10 left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex">
        {tooltip}
      </span>
    </div>
  );
};
export interface CharacterConfig {
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

interface MessageExample {
  user: string;
  content: {
    text: string;
  };
}

const CharacterConfigEditor = ({
  initialConfig,
}: {
  initialConfig: CharacterConfig;
}) => {
  const [config, setConfig] = useState<CharacterConfig>(initialConfig);
  const [showCopyToast, setShowCopyToast] = useState(false);

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
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
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

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    updateField("clients", selectedOptions);
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
              onChange={(e) => handleStringArrayChange(path, index, e.target.value)}
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
      <div className="flex justify-between items-center sticky top-0 border-b border-gray-800 p-4 bg-black/80 backdrop-blur-sm z-10">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Character Configuration
        </h2>
        <div className="flex gap-2">
          <DeployButton config={config} />
          <button
            onClick={handleCopyConfig}
            className="px-4 py-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded transition-colors"
          >
            Copy JSON
          </button>
          <button
            onClick={handleDownloadConfig}
            className="px-4 py-2 bg-green-600/80 hover:bg-green-500 text-white rounded transition-colors"
          >
            Download
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
   <label className="flex gap-1 text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
     Name <Tooltip tooltip="Name of your agent" />
   </label>
   <input
     type="text"
     value={config.name}
     onChange={(e) => updateField("name", e.target.value)}
     className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-white focus:border-blue-500/50 outline-none transition-colors"
     placeholder="Enter agent name..."
   />
 </div>
 <div className="bg-black/30 p-4 rounded-lg border border-gray-800 opacity-75">
   <label className="flex gap-1 text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
     Model Provider <Tooltip tooltip="Default model is Together AI" />
   </label>
   <select
     value={config.modelProvider}
     disabled
     className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-white cursor-not-allowed"
   >
     <option value="together">together</option>
   </select>
 </div>
        </div>

        <div>
          <label className="flex gap-1 text-lg font-medium text-blue-500">
            Client
            <Tooltip tooltip="Select a client for your agent" />
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {CLIENT_TYPES.map((client) => (
              <button
                key={client}
                onClick={() => updateField("clients", [client])}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  config.clients[0] === client
                    ? "border-blue-500 bg-blue-500/20 text-blue-400"
                    : "border-gray-700 bg-black/50 text-gray-400 hover:border-blue-500/50"
                }`}
              >
                {client}
              </button>
            ))}
          </div>
        </div>

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
            Helps ground the character's responses in factual information <br />
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
      </div>

      {showCopyToast && (
        <div className="fixed bottom-4 right-4 px-4 py-2 bg-green-600 text-white rounded shadow-lg">
          Configuration copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default CharacterConfigEditor;

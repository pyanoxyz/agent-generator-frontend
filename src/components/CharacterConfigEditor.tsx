import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import cn from "classnames";

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

const CLIENT_TYPES = [
  "discord",
  "direct",
  "twitter",
  "telegram",
  "farcaster",
  "lens",
  "auto",
  "slack",
];

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
interface CharacterConfig {
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
    <div className="space-y-2">
      <label className="flex gap-1 text-lg font-medium text-blue-500">
        {label}
        {tooltip && <Tooltip tooltip={tooltip} />}
      </label>
      {array.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) =>
              handleStringArrayChange(path, index, e.target.value)
            }
            className="flex-1 px-3 py-2 bg-black border border-gray-800 rounded text-white"
            placeholder={`Enter ${label.toLowerCase()} item`}
          />
          <button
            onClick={() => removeStringArrayItem(path, index)}
            className="px-2 py-1 text-red-500 hover:text-red-400 border border-gray-800 rounded"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={() => addStringArrayItem(path)}
        className="text-sm text-blue-500 hover:text-blue-400"
      >
        + Add {label} Item
      </button>
    </div>
  );

  return (
    <div className="mx-auto space-y-6 mb-10 rounded-lg">
      <div className="flex justify-between items-center sticky top-0 border-b border-gray-800 p-4 bg-black z-10">
        <h2 className="text-xl font-bold text-white">
          Character Configuration
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handleCopyConfig}
            className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-500"
          >
            Copy JSON
          </button>
          <button
            onClick={handleDownloadConfig}
            className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-500"
          >
            Download JSON
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex gap-1 text-lg font-medium text-blue-500">
              Name <Tooltip tooltip="Name of your agent" />
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white"
            />
          </div>
          <div>
            <label className="flex gap-1 text-lg font-medium text-blue-500">
              Model Provider{" "}
              <Tooltip tooltip="AI model your character will use" />
            </label>
            <select
              value={config.modelProvider}
              onChange={(e) => updateField("modelProvider", e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white"
            >
              {MODEL_PROVIDERS.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex gap-1 text-lg font-medium text-gray-300">
            Clients
            <Tooltip tooltip="Available clients for agent" />
          </label>
          <select
            multiple
            value={config.clients}
            onChange={handleClientChange}
            className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white"
            size={4}
          >
            {CLIENT_TYPES.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Hold Ctrl/Cmd to select multiple clients
          </p>
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

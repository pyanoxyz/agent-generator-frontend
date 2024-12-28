import React, { useState } from "react";

// Constants for select options
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
    array: string[]
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
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
    <div className="mx-auto space-y-6  rounded-lg">
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
            <label className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-800 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Model Provider
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
          <label className="block text-sm font-medium text-gray-300">
            Clients
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

        {renderStringArrayField("Bio", "bio", config.bio)}
        {renderStringArrayField("Lore", "lore", config.lore)}
        {renderStringArrayField("Knowledge", "knowledge", config.knowledge)}
        {renderStringArrayField("Topics", "topics", config.topics)}
        {renderStringArrayField(
          "Post Examples",
          "postExamples",
          config.postExamples
        )}
        {renderStringArrayField("Style All", "style.all", config.style.all)}
        {renderStringArrayField("Style Chat", "style.chat", config.style.chat)}
        {renderStringArrayField("Style Post", "style.post", config.style.post)}
        {renderStringArrayField("Adjectives", "adjectives", config.adjectives)}
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

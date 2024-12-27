import React, { useState, useRef } from "react";
import CharacterConfigEditor from "./CharacterConfigEditor";

// API endpoint
const API_URL = "http://0.0.0.0:8000/generate_character";

// Toast types and interface
type ToastType = "error" | "success";
interface Toast {
  message: string;
  type: ToastType;
}

const generateAgent = async (prompt: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.character_json;
};

const CreateAgentForm = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentJson, setAgentJson] = useState(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!prompt) return;

    setIsLoading(true);
    try {
      const agent = await generateAgent(prompt);
      setAgentJson(agent);
    } catch (error) {
      console.error("Failed to generate agent:", error);
      showToast(
        "Failed to generate character. Please try again later.",
        "error"
      );
    }
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        // Validate required keys
        const requiredKeys = [
          "name",
          "modelProvider",
          "clients",
          "bio",
          "lore",
          "style",
        ];
        const hasAllKeys = requiredKeys.every((key) => key in json);

        if (!hasAllKeys) {
          throw new Error("Invalid character configuration format");
        }

        setAgentJson(json);
        showToast("Character loaded successfully!", "success");
      } catch (error) {
        showToast("Invalid JSON file format. Please check the file.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    setAgentJson(null);
    setPrompt("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file?.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setAgentJson(json);
          showToast("Character loaded successfully!", "success");
        } catch (error) {
          showToast(
            "Invalid JSON file format. Please check the file.",
            "error"
          );
        }
      };
      reader.readAsText(file);
    } else {
      showToast("Please upload a JSON file.", "error");
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-mono overflow-hidden justify-center gap-4">
      {/* Left Sidebar */}
      <div className="w-80 bg-zinc-900 p-4 border-r border-zinc-800">
        <div className="space-y-6">
          {/* Generate Section */}
          <div>
            <h2 className="text-sm font-medium mb-2">Generate Character</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your character in detail..."
                className="w-full h-32 bg-black border border-zinc-800 p-3 text-sm resize-none mb-2"
              />
              {agentJson ? (
                <div className="flex gap-2">
                  <button
                    disabled={isLoading}
                    onClick={handleReset}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm transition-colors disabled:opacity-50"
                  >
                    Create New
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Generating..." : "Generate Character"}
                </button>
              )}
            </form>
          </div>

          {/* Load Character Section */}
          <div>
            <h2 className="text-sm font-medium mb-2">Load Character</h2>
            <div
              className="border border-dashed border-zinc-700 rounded p-4 text-center text-sm text-zinc-400 cursor-pointer hover:border-zinc-600 transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              Drop and drop a character JSON file here
              <span className="block text-zinc-500 mt-1">or</span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-blue-500 hover:text-blue-400"
              >
                Browse Files
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {agentJson ? (
        <div className="flex-1 overflow-auto max-w-4xl">
          <CharacterConfigEditor initialConfig={agentJson} />
        </div>
      ) : (
        <div className="max-w-4xl flex-1 flex items-center justify-center text-zinc-500">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin" />
              <span>Generating character configuration...</span>
            </div>
          ) : (
            <span>Enter a prompt to generate a character</span>
          )}
        </div>
      )}

      {/* Toast Messages */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg transition-all ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default CreateAgentForm;

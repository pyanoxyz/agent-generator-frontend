import React, { useState, useRef, useEffect, useMemo, memo } from "react";
import CharacterConfigEditor from "./Editor/CharacterConfigEditor";
import BrainVisualisation from "./BrainVisualisation";
import NavBar from "./layout/NavBar";
import { useSearchParams } from "react-router-dom";
import BalanceNotice from "./BalanceNotice";
import { API_BASE_URL } from "../api/agents";
import { CrossSvg, FadeBorder, FadeBorderHorizontal } from "./LandingPage";
import VerticalBars from "./SpacedBars";

import { useLocation } from "react-router-dom";

// API endpoint
const API_URL = import.meta.env.DEV
  ? `${API_BASE_URL}/generate_character`
  : `${API_BASE_URL}/generate_character`;

// Toast types and interface
type ToastType = "error" | "success";
interface Toast {
  message: string;
  type: ToastType;
}

const MemoizedVerticalBars = memo(VerticalBars);

const RobotDiv = () => {
  const verticalBars = useMemo(() => <MemoizedVerticalBars key="vertical" />, []);

  return (
    <div className="flex h-full w-full">
      <div className="flex w-full flex-col gap-4 items-center relative justify-center overflow-hidden">
        <div className="w-64 h-64">
          <BrainVisualisation />
        </div>
        <div className="flex align-bottom w-[99%] absolute bottom-0 rounded-b-lg pb-0.25">
          {verticalBars}
        </div>
      </div>
    </div>
  );
};

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
  data.modelProvider = "together";
  data.plugins = [];
  data.clients = ["twitter"];
  return data.character_json;
};

const REQUIRED_AGENT_KEYS = [
  "name",
  // "modelProvider",
  // "clients",
  "bio",
  "lore",
  "style",
];

const validateAgentData = (data: any) => {
  const missingKeys = REQUIRED_AGENT_KEYS.filter((key) => !(key in data));
  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
};

const validateAndProcessAgent = (agentData: any) => {
  const validation = validateAgentData(agentData);

  if (!validation.isValid) {
    throw new Error(`Missing required fields: ${validation.missingKeys.join(", ")}`);
  }

  // Add default values
  return {
    ...agentData,
    modelProvider: "together",
    plugins: [],
  };
};

const CreateAgentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [agentJson, setAgentJson] = useState(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [validationError, setValidationError] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setUrlSearchParams] = useSearchParams();
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt || "";
  const [prompt, setPrompt] = useState(initialPrompt);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e?: any, parsedPrompt?: string) => {
    if (e) {
      e.preventDefault();
    }
    if (!parsedPrompt) {
      if (!prompt) {
        return;
      }
    }

    const agentPrompt = parsedPrompt || prompt;

    setIsLoading(true);
    setValidationError([]);

    try {
      const agent = await generateAgent(agentPrompt);
      const processedAgent = validateAndProcessAgent(agent);
      setAgentJson(processedAgent);
    } catch (error) {
      console.error("Failed to generate agent:", error);
      if (error instanceof Error && error.message.includes("Missing required fields")) {
        const missingKeys = error.message.split(": ")[1].split(", ");
        setValidationError(missingKeys);
      }
      showToast(error instanceof Error ? error.message : "Failed to generate character", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const processedAgent = validateAndProcessAgent(json);
        setAgentJson(processedAgent);
        showToast("Character loaded successfully!", "success");
      } catch (error) {
        showToast(error instanceof Error ? error.message : "Invalid JSON file format", "error");
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
          showToast("Invalid JSON file format. Please check the file.", "error");
        }
      };
      reader.readAsText(file);
    } else {
      showToast("Please upload a JSON file.", "error");
    }
  };

  useEffect(() => {
    const promptParam = searchParams.get("prompt");
    if (promptParam && promptParam.length > 0) {
      const prompt = decodeURIComponent(promptParam);
      setPrompt(prompt);
      searchParams.delete("prompt");
      setUrlSearchParams(searchParams);

      setTimeout(() => {
        handleSubmit(null, prompt);
      }, 1000);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen  text-white font-mono ">
      <div className="mt-2">
        <NavBar />
      </div>
      <div className="flex container flex-col-reverse mt-2 lg:flex-row bg-secondary text-white font-mono justify-center xl:mx-auto min-h-[calc(100vh-64px)] px-4">
        {/* Left Sidebar */}
        <div className="p-4 border border-borderPrimary rounded-lg justify-start flex flex-col lg:sticky top-0 lg:max-w-80">
          <div className="gap-1 lg:gap-7 flex flex-col justify-evenly">
            {/* Generate Section */}
            <h1 className="text-lg lg:text-2xl font-bold lg:mb-4 md:mt-4 text-primary">
              Create your <br /> DevRel Agent <br /> with Pyano
            </h1>
            <div>
              <h2 className="text-md font-bold mb-2 text-textHeading">Generate Agent Character</h2>
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <CrossSvg className="absolute -top-3 -left-3" />
                  <CrossSvg className="absolute -top-3 -right-3" />
                  <CrossSvg className="absolute -bottom-3 -left-3" />
                  <CrossSvg className="absolute -bottom-3 -right-3" />

                  <FadeBorder className="absolute left-0 top-0 h-full" height=" h-[12rem]" />
                  <FadeBorder className="absolute right-0 top-0 h-full" height=" h-[12rem]" />
                  <FadeBorderHorizontal className="absolute top-0  w-full" />
                  <FadeBorderHorizontal className="absolute bottom-0  w-full" />
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (e.metaKey || e.ctrlKey) {
                          setPrompt((prev: string) => prev + "\n");
                        } else {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }
                    }}
                    placeholder="Describe your character in detail..."
                    className="w-full h-32  text-black placeholder-gray-400 p-3 text-sm resize-none mb-2 outline-none bg-secondary  bg-opacity-50 border-none"
                  />
                </div>

                {validationError.length > 0 && (
                  <div className="mb-4 mt-4 p-3 border border-red-500 rounded bg-red-500/10 text-sm">
                    <p className="text-red-400 mb-2">Missing required fields:</p>
                    <ul className="list-disc list-inside text-red-300">
                      {validationError.map((key) => (
                        <li key={key}>{key}</li>
                      ))}
                    </ul>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setValidationError([]);
                        handleSubmit(e);
                      }}
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm transition-colors"
                    >
                      Retry Generation
                    </button>
                  </div>
                )}
                {agentJson ? (
                  <div className="flex gap-2 mt-4">
                    <button
                      disabled={isLoading}
                      onClick={handleReset}
                      className="flex-1 bg-primary rounded-full  px-4 py-2 text-sm transition-colors disabled:opacity-50"
                    >
                      Create New
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    // className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 px-4 py-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                    className="w-full mt-4 bg-primary rounded-full  px-4 py-2 text-sm transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Generating..." : "Compose Agent"}
                  </button>
                )}
              </form>
            </div>

            {/* Load Character Section */}
            <div>
              <h2 className="text-md font-bold mb-2 text-textHeading">Load Character</h2>
              <div className="relative">
                <CrossSvg className="absolute -top-3 -left-3" />
                <CrossSvg className="absolute -top-3 -right-3" />
                <CrossSvg className="absolute -bottom-3 -left-3" />
                <CrossSvg className="absolute -bottom-3 -right-3" />

                <FadeBorder className="absolute left-0 top-0 h-full" height=" h-[12rem]" />
                <FadeBorder className="absolute right-0 top-0 h-full" height=" h-[12rem]" />
                <FadeBorderHorizontal className="absolute top-0  w-full" />
                <FadeBorderHorizontal className="absolute bottom-0  w-full" />

                <div
                  className="border-none  border-zinc-700 rounded p-4 text-center text-sm text-zinc-400 cursor-pointer hover:border-zinc-600 transition-colors"
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
                    className="mt-2 text-blue-400 hover:text-blue-400"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="mt-8 p-4 border border-zinc-700 rounded bg-zinc-900">
              <h2 className="text-lg font-semibold mb-2 text-blue-400">
                Coming Soon!
              </h2>
              <p className="text-sm text-zinc-400">
                Exciting news! We are working on a desktop app that will allow
                you to run Eliza on your machine with just one click. Stay tuned
                for more updates!
              </p>
            </div> */}
            <BalanceNotice />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full bg-secondary from-blue-900/20 relative  to-purple-900/20 pl-4 ">
          {agentJson ? (
            <div className="flex-1">
              <CharacterConfigEditor initialConfig={agentJson} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center h-full bg-secondary border border-borderPrimary rounded-lg ">
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin" />
                  <span className="text-black">Generating character configuration...</span>
                </div>
              ) : (
                <RobotDiv />
              )}
            </div>
          )}
        </div>
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
    </div>
  );
};

export default CreateAgentForm;

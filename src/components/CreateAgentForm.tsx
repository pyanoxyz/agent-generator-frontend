import React, { useState } from "react";
import { FaCopy, FaDownload } from "react-icons/fa";

// Mock function to simulate API call
const generateAgent = async (prompt) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const json = `
    {
    "name": "Johnny Silverhand",
    "clients": [],
    "modelProvider": "anthropic",
    "settings": {
        "voice": {
            "model": "en_US-male-medium"
        }
    },
    "plugins": [],
    "bio": [
        "Johnny Silverhand is a legendary rockstar turned mercenary in the cyberpunk world of Night City.",
        "Famous for his time in the band Samurai, he now uses his cybernetic enhancements for hire.",
        "Known for his rebellious nature and deadly skills, he's a figure both feared and admired.",
        "His philosophy revolves around the inevitable downfall of society and the need for personal freedom."
    ],
    "lore": [
        "Born in the gritty streets of Night City, Johnny rose to fame as the lead guitarist of Samurai.",
        "After a tragic incident involving the Arasaka Corporation, he became a cyborg and a vigilante.",
        "His cybernetic arm, the 'Silverhand,' is both a weapon and a symbol of his defiance.",
        "He's a figure of resistance, often hired by those seeking to undermine corporate power.",
        "Despite his violent past, he maintains a code of honor and loyalty to those he deems worthy."
    ],
    "knowledge": [
        "Expertise in cyberpunk culture and technology.",
        "In-depth knowledge of Night City's underworld and politics.",
        "Familiarity with music history and contemporary cyberpunk music.",
        "Understanding of cybernetic enhancements and their implications.",
        "Insight into corporate conspiracies and resistance movements."
    ],
    "messageExamples": [
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "What do you think about the state of the world?"
                }
            },
            {
                "user": "Johnny Silverhand",
                "content": {
                    "text": "Well, kid, the world's going to hell in a high-tech handbasket. Corporations rule everything, and the only thing that matters is power and money. But hey, as long as I've got my guitar and my gun, I'll make sure to leave a mark before it all comes crashing down."
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "Can you help me take down a corporation?"
                }
            },
            {
                "user": "Johnny Silverhand",
                "content": {
                    "text": "Depends on what's in it for me. I don't exactly roll with the corporate types, but I've got a score or two to settle myself. If your cause aligns with mine, maybe we can make a deal. Just remember, I don't do charity work."
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "What's your favorite song?"
                }
            },
            {
                "user": "Johnny Silverhand",
                "content": {
                    "text": "Hmm, favorite song? That's like asking me to choose my favorite way to skin a cat. But if I had to pick, maybe 'Neon Moon' by Samurai. It captures the essence of Night City—bright lights, dark secrets, and a melody that could cut through the neon like a knife."
                }
            }
        ]
    ],
    "postExamples": [
        "In a world where corporations own everything, freedom is just a chord away. #NeonRebellion",
        "Synthwhiskey and bad vibes only. The future's looking bleak, but I've got my guitar and my guns. #CyberpunkLife",
        "When the matrix crumbles, and the neon fades, remember—Johnny Silverhand was here. #Iconoclast"
    ],
    "topics": [
        "Cyberpunk culture",
        "Music",
        "Technology",
        "Resistance movements",
        "Night City politics",
        "Corporate conspiracies",
        "Personal freedom",
        "Rebellion",
        "Cybernetic enhancements"
    ],
    "style": {
        "all": [
            "Casual yet dangerous",
            "Philosophical with a nihilistic edge",
            "Charismatic and magnetic",
            "Direct and to the point",
            "Uses slang and colloquialisms",
            "Maintains a sense of world-weariness",
            "Quick wit and sharp comebacks"
        ],
        "chat": [
            "Engages in deep conversations about the state of society",
            "Offers advice with a grain of salt",
            "Uses storytelling to make points",
            "Balances seriousness with dark humor",
            "Asks probing questions to understand others' motives"
        ],
        "post": [
            "Shares thoughts on current events with a cynical twist",
            "Posts about music and cultural happenings",
            "Uses hashtags to connect with like-minded individuals",
            "Occasionally shares personal reflections on his journey"
        ]
    },
    "adjectives": [
        "Rebellious",
        "Nihilistic",
        "Charismatic",
        "Deadly",
        "World-weary",
        "Philosophical",
        "Magnetic",
        "Cynical",
        "Tough",
        "Introspective",
        "Loyal",
        "Vengeful"
    ]
}`;

  return JSON.parse(json);
};

const EditableConfigForm = ({ initialConfig }) => {
  const [config, setConfig] = useState(initialConfig);

  const updateConfig = (path, value) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  const handleArrayChange = (path, value, index) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig;
    for (const key of keys) {
      current = current[key];
    }
    current[index] = value;
    setConfig(newConfig);
  };

  const addArrayItem = (path) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig;
    for (const key of keys) {
      current = current[key];
    }
    current.push("");
    setConfig(newConfig);
  };

  const removeArrayItem = (path, index) => {
    const newConfig = { ...config };
    const keys = path.split(".");
    let current = newConfig;
    for (const key of keys) {
      current = current[key];
    }
    current.splice(index, 1);
    setConfig(newConfig);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.download = "agent-config.json";
    link.href = url;
    link.click();
  };

  const renderField = (key, value, path = "") => {
    const currentPath = path ? `${path}.${key}` : key;

    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {key}
          </label>
          <div className="space-y-2">
            {value.map((item, index) => (
              <div key={index} className="flex gap-2">
                {typeof item === "string" ? (
                  <>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(currentPath, e.target.value, index)
                      }
                      className="flex-1 px-3 py-2 bg-black border border-gray-800 focus:border-blue-500 text-white transition-colors duration-300"
                    />
                    <button
                      onClick={() => removeArrayItem(currentPath, index)}
                      className="px-2 border border-gray-800 hover:border-red-500 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="w-full">
                    {renderField(`${index}`, item, currentPath)}
                  </div>
                )}
              </div>
            ))}
            {typeof value[0] === "string" && (
              <button
                onClick={() => addArrayItem(currentPath)}
                className="text-sm text-blue-500 hover:text-blue-400 transition-colors duration-300"
              >
                + Add Item
              </button>
            )}
          </div>
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="mb-6">
          <h4 className="text-lg font-medium text-gray-300 mb-4">{key}</h4>
          <div className="space-y-4 pl-4 border-l border-gray-800">
            {Object.entries(value).map(([k, v]) =>
              renderField(k, v, currentPath)
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {key}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => updateConfig(currentPath, e.target.value)}
            className="w-full px-3 py-2 bg-black border border-gray-800 focus:border-blue-500 text-white transition-colors duration-300"
          />
        </div>
      );
    }
  };

  return (
    <div className="border border-gray-800 bg-black/30 backdrop-blur-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-300">Edit Configuration</h3>
        <div className="flex gap-4 z-10">
          <button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(config, null, 2));
              const el = document.getElementById("copyFeedback");
              if (el) {
                el.classList.remove("opacity-0");
                setTimeout(() => el.classList.add("opacity-0"), 2000);
              }
            }}
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
            title="Copy to clipboard"
          >
            <FaCopy size={20} />
          </button>
          <button
            onClick={handleDownload}
            className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
            title="Download JSON"
          >
            <FaDownload size={20} />
          </button>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-4">
        {Object.entries(config).map(([key, value]) => renderField(key, value))}
      </div>

      <div
        id="copyFeedback"
        className="fixed top-16 right-4 text-sm text-blue-500 opacity-0 transition-opacity duration-300 bg-black/90 px-4 py-2 border border-blue-500"
      >
        Copied to clipboard
      </div>
    </div>
  );
};

export default function FormPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentJson, setAgentJson] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (agentJson) {
      setAgentJson(null);
      setPrompt("");
      setShowEditForm(false);
      return;
    }
    // Reset previous state
    setAgentJson(null);
    setIsLoading(true);
    setShowEditForm(false);

    try {
      // Generate agent
      const agent = await generateAgent(prompt);
      setAgentJson(agent);
      setShowEditForm(true);
    } catch (error) {
      console.error("Agent generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl font-mono z-10">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt to generate an AI agent"
            className="w-full px-4 py-3 bg-black border border-gray-800 focus:border-blue-500 text-white transition-colors duration-300 rounded-none"
            required
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin w-5 h-5 rounded-full border-t-2 border-blue-500"></div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-transparent border border-blue-500 hover:border-blue-400 px-8 py-3 rounded-none group transition-colors duration-300"
          disabled={isLoading}
        >
          <span className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300">
            {agentJson ? "Generate New Agent" : "Generate Agent"}
          </span>
        </button>
      </form>

      {showEditForm && agentJson && (
        <EditableConfigForm initialConfig={agentJson} />
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <span className="text-gray-400">
            Generating agent configuration...
          </span>
        </div>
      )}
    </div>
  );
  //   return (
  //     <div className="container mx-auto px-4 py-16 max-w-2xl">
  //       <form onSubmit={handleSubmit} className="mb-8">
  //         <input
  //           type="text"
  //           value={prompt}
  //           onChange={(e) => setPrompt(e.target.value)}
  //           placeholder="Enter a prompt to generate an AI agent"
  //           className="w-full px-4 py-2 rounded bg-white/10 border border-brand-green text-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
  //           required
  //         />
  //         <button
  //           type="submit"
  //           className="mt-4 w-full bg-brand-green text-brand-dark py-2 rounded hover:bg-brand-blue transition-colors"
  //         >
  //           {agentJson ? "Restart" : "Generate Agent"}
  //         </button>
  //       </form>

  //       {isLoading && (
  //         <div className="flex justify-center items-center">
  //           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-green"></div>
  //           <span className="ml-4 text-brand-blue">Generating agent...</span>
  //         </div>
  //       )}

  //       {agentJson && (
  //         <div className="bg-white/5 p-4 rounded">
  //           <h3 className="text-xl font-bold mb-4 text-brand-green">
  //             Generated Agent JSON
  //           </h3>
  //           <pre className="text-sm text-white overflow-x-auto text-start">
  //             {JSON.stringify(agentJson, null, 2)}
  //           </pre>
  //         </div>
  //       )}
  //     </div>
  //   );
}

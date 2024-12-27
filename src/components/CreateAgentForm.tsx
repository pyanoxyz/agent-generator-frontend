import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

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
  // Generate a mock agent JSON based on the prompt
  return {
    name: `Agent derived from: ${prompt}`,
    description: `An AI agent created with the prompt: "${prompt}"`,
    personality: {
      traits: ["adaptive", "intelligent", "creative"],
      communication_style: "informative and engaging",
    },
    knowledge_domains: ["general", "context-specific"],
    generation_details: {
      prompt: prompt,
      timestamp: new Date().toISOString(),
    },
  };
};

export default function FormPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentJson, setAgentJson] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (agentJson) {
      setAgentJson(null);
      setPrompt("");
      return;
    }
    // Reset previous state
    setAgentJson(null);
    setIsLoading(true);

    try {
      // Generate agent
      const agent = await generateAgent(prompt);
      setAgentJson(agent);
    } catch (error) {
      console.error("Agent generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl font-mono">
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

      {agentJson && (
        <div className="border border-gray-800 bg-black/30 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-6 text-gray-300">
            Generated Agent Configuration
          </h3>
          <div className="bg-black border border-gray-800 p-4 relative group">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  JSON.stringify(agentJson, null, 2)
                );
                const el = document.getElementById("copyFeedback");
                if (el) {
                  el.classList.remove("opacity-0");
                  setTimeout(() => el.classList.add("opacity-0"), 2000);
                }
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-300 transition-colors duration-300"
            >
              <FaCopy size={20} />
              <div
                id="copyFeedback"
                className="absolute top-full right-0 mt-2 text-sm text-blue-500 opacity-0 transition-opacity duration-300 whitespace-nowrap"
              >
                Copied to clipboard
              </div>
            </button>
            <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono">
              {JSON.stringify(agentJson, null, 2)}
            </pre>
          </div>
        </div>
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

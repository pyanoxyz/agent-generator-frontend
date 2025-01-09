import { useState } from "react";
import { Character } from "../Agents/agents";
import { Tooltip } from "../common/Tooltip";
import { useToast } from "../../hooks/useToast";
import { updateCharacterKey } from "../../api/character";
import DynamicPromptOverlay from "./PromptInput";
import { EmptyState } from "./EmptyField";
import RegenerateButton from "./RegenerateButton";

interface CharacterFieldsProps {
  config: Character;
  setConfig: React.Dispatch<React.SetStateAction<Character>>;
}
const CharacterFields = ({ config, setConfig }: CharacterFieldsProps) => {
  const [regeneratingFields, setRegeneratingFields] = useState<
    Record<string, boolean>
  >({});
  const [activePromptField, setActivePromptField] = useState<{
    path: string;
    label: string;
  } | null>(null);
  const showToast = useToast((state) => state.showToast);
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

  const handlePromptSubmit = async (prompt: string) => {
    if (!activePromptField) return;

    const { path, label } = activePromptField;
    setRegeneratingFields((prev) => ({ ...prev, [path]: true }));

    try {
      const updatedContent = await updateCharacterKey(config, path, prompt);

      const newConfig = { ...config };
      const keys = path.split(".");
      let current = newConfig as any;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = updatedContent;
      setConfig(newConfig);
      showToast(`${label} updated successfully!`, "success");
      setActivePromptField(null);
      
    } catch (error) {
      showToast(`Failed to update ${label}`, "error");
    } finally {
      setRegeneratingFields((prev) => ({ ...prev, [path]: false }));
    }
  };

  const renderStringArrayField = (
    label: string,
    path: string,
    array: string[],
    tooltip?: React.ReactNode
  ) => (
    <div className="bg-black/30 p-6 rounded-lg border border-gray-800 ">
      <div className="flex justify-between items-center mb-4 relative">
        <label className="flex gap-1 text-lg font-medium text-blue-500">
          {label}
          {tooltip && <Tooltip tooltip={tooltip} />}
        </label>
        <div className="relative">
          <RegenerateButton
            onClick={() => setActivePromptField({ path, label })}
            disabled={regeneratingFields[path]}
            isRegenerating={regeneratingFields[path]}
          />
          <DynamicPromptOverlay
            isOpen={activePromptField?.path === path}
            onClose={() => setActivePromptField(null)}
            onSubmit={handlePromptSubmit}
            isLoading={regeneratingFields[path]}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        {!array || array.length === 0 ? (
          <EmptyState label={label} />
        ) : (
          array.map((item, index) => (
            <div key={index} className="group relative">
              <textarea
                value={item}
                onChange={(e) =>
                  handleStringArrayChange(path, index, e.target.value)
                }
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-gray-200 min-h-[60px] resize-y text-sm leading-relaxed focus:border-blue-500/50 outline-none transition-colors pr-12"
                placeholder={`Enter ${label.toLowerCase()} item`}
              />
              <button
                onClick={() => removeStringArrayItem(path, index)}
                className="absolute top-1/2 -translate-y-1/2 right-3 h-8 w-8 flex items-center justify-center text-red-500 hover:text-red-400 border border-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/50"
              >
                x
              </button>
            </div>
          ))
        )}
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
    <>
      <div>
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
    </>
  );
};

export default CharacterFields;

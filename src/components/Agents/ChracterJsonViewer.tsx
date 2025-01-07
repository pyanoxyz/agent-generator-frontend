import React, { JSX, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { Character } from './agents';
import { useToast } from '../../hooks/useToast';

interface CharacterJSONProps {
  character: Character;
}

export const SimpleCharacterJSON: React.FC<CharacterJSONProps> = ({ character }) => {
  const [copied, setCopied] = useState(false);
  const showToast = useToast((state) => state.showToast);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(character, null, 2));
    setCopied(true);
    showToast('Configuration copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const renderValue = (value: any): JSX.Element | string => {
    if (typeof value === 'string') return `"${value}"`;
    if (Array.isArray(value)) {
      return (
        <div className="pl-4">
          [
          {value.map((item, index) => (
            <div key={index} className="pl-4">
              {renderValue(item)}
              {index < value.length - 1 ? "," : ""}
            </div>
          ))}
          ]
        </div>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return renderObject(value);
    }
    return String(value);
  };

  const renderObject = (obj: any): JSX.Element => {
    return (
      <div className="pl-4">
        {"{"}
        {Object.entries(obj).map(([key, value], index, array) => (
          <div key={key} className="pl-4">
            <span className="text-green-400">"{key}"</span>: {renderValue(value)}
            {index < array.length - 1 ? "," : ""}
          </div>
        ))}
        {"}"}
      </div>
    );
  };

  return (
    <div className="border-t border-gray-800 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Character Configuration</h3>
        <button
          onClick={handleCopyJson}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FiCopy className="size-4" />
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
      </div>
      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <div className="text-gray-300">
          {renderObject(character)}
        </div>
      </div>
    </div>
  );
};
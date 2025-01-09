import React, { useState, useRef, useEffect } from 'react';

interface DynamicPromptOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const DynamicPromptOverlay = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading
}: DynamicPromptOverlayProps) => {
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setPrompt('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setPrompt(textarea.value);
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className="absolute top-full right-0 mt-2 z-50 max-w-[90vw] w-96">
        <div className="bg-gray-900/95 rounded-lg border border-gray-800 shadow-xl p-2 flex flex-col gap-2">
          <textarea
            ref={inputRef}
            value={prompt}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Enter prompt..."
            className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-lg text-gray-200 text-sm focus:border-blue-500/50 outline-none resize-none min-h-[44px] leading-relaxed"
            disabled={isLoading}
            rows={1}
          />
          <div className="flex justify-between items-center px-1 text-xs text-gray-500">
            <span>Shift + Enter for new line</span>
            {prompt.trim() && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-500 hover:text-green-400 border border-green-500/20 hover:border-green-500/40 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-black/50"
              >
                <span>Enter</span>
                <span className="text-xs opacity-50">↵</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicPromptOverlay;
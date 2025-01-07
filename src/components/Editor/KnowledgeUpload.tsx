import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline, IoClose, IoDocumentTextOutline } from 'react-icons/io5';
import { FaInfoCircle } from 'react-icons/fa';

interface KnowledgeProcessorProps {
  onFileAdd: (file: File) => void;
  onFileRemove: (index: number) => void;
  files: File[];
}

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const KnowledgeProcessor: React.FC<KnowledgeProcessorProps> = ({ onFileAdd, onFileRemove, files = [] }) => {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!file) return false;
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 4MB');
      return false;
    }
    const validTypes = ['application/pdf', 'text/plain', 'text/markdown'];
    if (!validTypes.includes(file.type)) {
      setError('Only PDF and TXT files are supported');
      return false;
    }
    return true;
  };

  const handleFileAdd = (file: File) => {
    console.log('Validating file:', {
      name: file.name,
      size: file.size,
      type: file.type
    });
  
    if (validateFile(file)) {
      console.log('File validation passed, adding to state');
      onFileAdd(file);
    } else {
      console.log('File validation failed');
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files) {
      console.log('Files selected:', Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      })));
      Array.from(e.target.files).forEach(handleFileAdd);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError('');
    Array.from(e.dataTransfer.files).forEach(handleFileAdd);
  };

  return (
    <div className="bg-black/30 p-6 rounded-lg border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-medium text-blue-500">Knowledge Files</h2>
        <div className="relative group">
          <FaInfoCircle className="text-gray-400 group-hover:text-gray-200 size-3.5" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex">
            Upload PDF or TXT files to add to knowledge base
          </span>
        </div>
      </div>
      
      <div
        className="border-2 border-dashed rounded-lg p-8 text-center transition-colors border-gray-700 hover:border-blue-500/50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="space-y-3 mb-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <IoDocumentTextOutline className="text-gray-400 size-5" />
                <span className="text-sm text-gray-200 truncate">{file.name}</span>
              </div>
              <button
                onClick={() => onFileRemove(index)}
                className="text-gray-400 hover:text-gray-200 p-1"
                type="button"
              >
                <IoClose className="size-5" />
              </button>
            </div>
          ))}
        </div>
        
        <IoCloudUploadOutline className="mx-auto text-gray-400 size-10 mb-3" />
        <p className="text-sm text-gray-400 mb-2">
          Drag and drop PDF or TXT files here
        </p>
        <p className="text-xs text-gray-500 mb-4">Max file size: 4MB</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.txt"
          className="hidden"
          multiple
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-sm text-blue-500 hover:text-blue-400 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-colors"
          type="button"
        >
          Browse Files
        </button>
      </div>
      
      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default KnowledgeProcessor;
interface EditorHeaderProps {
    onDeploy: () => void;
    onCopy: () => void;
    onDownload: () => void;
  }
  
  export const EditorHeader: React.FC<EditorHeaderProps> = ({
    onDeploy,
    onCopy,
    onDownload,
  }) => (
    <div className="flex justify-between items-center sticky top-0 border-b border-gray-800 p-4 bg-black/80 backdrop-blur-sm z-10">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Character Configuration
      </h2>
      <div className="flex gap-2">
        {/* <button
          onClick={onDeploy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
        >
          Deploy
        </button> */}
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded transition-colors"
        >
          Copy JSON
        </button>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-green-600/80 hover:bg-green-500 text-white rounded transition-colors"
        >
          Download
        </button>
      </div>
    </div>
  );
  
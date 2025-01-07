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
  <div className="flex flex-col sm:flex-row justify-between items-center sticky top-0 border-b border-gray-800 p-3 sm:p-4 bg-black/80 backdrop-blur-sm z-10 gap-4 sm:gap-0">
    <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Character Configuration
    </h2>
    <div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
      <button
        onClick={onDeploy}
        className="flex-1 sm:flex-none min-w-[80px] px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base rounded-lg transition-colors"
      >
        Deploy
      </button>
      <button
        onClick={onCopy}
        className="flex-1 sm:flex-none min-w-[80px] px-3 sm:px-4 py-2 bg-blue-600/80 hover:bg-blue-500 text-white text-sm sm:text-base rounded-lg transition-colors"
      >
        Copy JSON
      </button>
      <button
        onClick={onDownload}
        className="flex-1 sm:flex-none min-w-[80px] px-3 sm:px-4 py-2 bg-green-600/80 hover:bg-green-500 text-white text-sm sm:text-base rounded-lg transition-colors"
      >
        Download
      </button>
    </div>
  </div>
);

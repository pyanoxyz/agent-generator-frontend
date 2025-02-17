interface EditorHeaderProps {
  onDeploy: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({ onDeploy, onCopy, onDownload }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center sticky top-0 border border-borderPrimary  bg-secondary rounded-xl p-3 sm:p-4  backdrop-blur-sm z-10 gap-4 sm:gap-0">
    <h2 className="text-lg sm:text-xl font-bold text-primary">Character Configuration</h2>
    <div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
      <button
        onClick={onDeploy}
        className="flex-1 sm:flex-none min-w-[80px] px-3 sm:px-4 py-2 bg-primary hover:drop-shadow-lg text-sm sm:text-base rounded-lg transition-colors"
      >
        Deploy
      </button>
      <button
        onClick={onCopy}
        className="hover:drop-shadow-lg flex-1 sm:flex-none min-w-[80px] px-3 sm:px-4 py-2 bg-secondary text-primary border border-primary text-sm sm:text-base rounded-lg transition-colors"
      >
        Copy JSON
      </button>
      <button
        onClick={onDownload}
        className="hover:drop-shadow-lg flex-1 sm:flex-none min-w-[80px] px-3 sm:px-4 py-2 bg-secondary text-primary border border-primary  text-sm sm:text-base rounded-lg transition-colors"
      >
        Download
      </button>
    </div>
  </div>
);

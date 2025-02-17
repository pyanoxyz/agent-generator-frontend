import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <BiErrorCircle className="text-red-500 size-10 mb-4" />
      <p className="text-red-500 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

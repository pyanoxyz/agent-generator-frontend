import { ClientType } from "@/types";

export const LoadingDots: React.FC = () => (
  <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
    <div className="flex items-center w-full">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[400px]">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[440px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[360px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);

interface LoadingScreenProps {
  clientType: ClientType;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ clientType }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">
          Initializing <span className="text-gray-600">{clientType}</span>...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

import { ClientType } from "@/types";

export const LoadingDots: React.FC = () => (
  <div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-primary/20 rounded-full dark:bg-bgPrimary/40 w-48 mb-4"></div>
    <div className="h-2 bg-primary/20 rounded-full dark:bg-bgPrimary/40 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-primary/20 rounded-full dark:bg-bgPrimary/40 mb-2.5"></div>
    <div className="h-2 bg-primary/20 rounded-full dark:bg-bgPrimary/40 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-primary/20 rounded-full dark:bg-bgPrimary/40 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-primary/20 rounded-full dark:bg-bgPrimary/40 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

interface LoadingScreenProps {
  clientType: ClientType;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ clientType }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)] bg-secondary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        <p className="text-primary font-medium">
          Initializing <span className="text-primary">{clientType}</span>...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

import { LoadingScreen } from "../common/LoadingDots";
import { useDevrelChat } from "../../context/DevrelChatContext";
import { ChatContainer } from "../Chat";
import NavBar from "../layout/NavBar";
import { ClientType } from "../../types";
import { useEffect } from "react";

interface DevrelDocsChatProps {
  clientType: ClientType;
}

export const DevrelDocsChat = ({ clientType }: DevrelDocsChatProps) => {
  // const { isConnecting, error } = useGradio();

  // useEffect(() => {
  //   initializeClient(clientType);
  // }, [clientType]);

  // if (isConnecting) {
  //   return (
  //     <div className="min-h-screen text-white font-mono">
  //       <NavBar sticky />
  //       <LoadingScreen clientType={clientType} />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen text-white font-mono">
  //       <NavBar sticky />
  //       <div className="flex items-center justify-center h-[calc(100vh-64px)]">
  //         <div className="text-center">
  //           <p className="text-xl font-semibold mb-2 text-red-500">Agent is offline</p>
  //           <p className="text-gray-400">{error.message}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen text-white font-mono">
      <NavBar sticky />
      <ChatContainer clientType={clientType} />
    </div>
  );
};

export default DevrelDocsChat;

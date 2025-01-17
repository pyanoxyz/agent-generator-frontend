import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
// import { WagmiConfig } from "wagmi";
// import { config } from "./configs/wagmi";
import LandingPage from "./components/LandingPage";
import CreateAgentForm from "./components/CreateAgentForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import DeployAgents from "./pages/DeployAgents";
import AgentsPage from "./components/Agents/AgentsPage";
import { ToastContainer } from "./components/common/ToastContainer";
import { GradioProvider } from "./context/GradioContext";
import DevrelDocsChat from "./components/layout/DevrelDocsChat";
import { ClientType } from "./types";
import { SolanaConfigProvider } from "./configs/solanaConfig";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <WagmiConfig config={config}> */}
      {/* <RainbowKitProvider theme={midnightTheme()}> */}
      <SolanaConfigProvider>
        <GradioProvider>
          <Router>
            <div className="bg-secondary overflow-auto">
              <div className="min-h-screen ">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/generate" element={<CreateAgentForm />} />
                  <Route path="/deploy_agents" element={<DeployAgents />} />
                  <Route path="/agents" element={<AgentsPage />} />
                  <Route
                    path="/chat-eliza"
                    element={<DevrelDocsChat clientType={ClientType.ELIZA} />}
                  />
                  <Route
                    path="/chat-langchain"
                    element={<DevrelDocsChat clientType={ClientType.LANGCHAIN} />}
                  />
                  <Route
                    path="/chat-langgraph"
                    element={<DevrelDocsChat clientType={ClientType.LANGGRAPH} />}
                  />
                </Routes>
                <ToastContainer />
              </div>
            </div>
          </Router>
        </GradioProvider>
      </SolanaConfigProvider>
      {/* </RainbowKitProvider> */}
      {/* </WagmiConfig> */}
    </QueryClientProvider>
  );
}

export default App;

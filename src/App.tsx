import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { config } from './configs/wagmi'
import LandingPage from "./components/LandingPage";
import CreateAgentForm from "./components/CreateAgentForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@rainbow-me/rainbowkit/styles.css';
import DeployAgents from "./pages/DeployAgents";
import AgentsPage from "./components/Agents/AgentsPage";
import { ToastContainer } from "./components/common/ToastContainer";

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={midnightTheme()}>
        <Router>
          <div className="bg-black">
            <div className="min-h-screen bg-gradient-to-br from-blue-900/20  to-purple-900/20 ">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/generate" element={<CreateAgentForm />} />
                <Route path="/deploy_agents" element={<DeployAgents />} />
                <Route path="/agents" element={<AgentsPage />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
    </QueryClientProvider>

  );
}

export default App;

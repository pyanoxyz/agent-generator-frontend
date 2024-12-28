import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreateAgentForm from "./components/CreateAgentForm";

function App() {
  return (
    <Router>
      <div className="bg-black">
        <div className="min-h-screen bg-gradient-to-br from-blue-900/20  to-purple-900/20 ">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/generate" element={<CreateAgentForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

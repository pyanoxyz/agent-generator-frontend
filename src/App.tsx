import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Lp";
// import FormPage from "./components/FormPage";
import FormPage from "./components/GenerateAgent";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-dark">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generate" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

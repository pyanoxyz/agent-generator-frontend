import NavBar from "../layout/NavBar";
import { AgentsDisplay } from "./AgentsDisplay";

const AgentsPage = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <NavBar className="mt-2" />
      <AgentsDisplay />
    </div>
  );
};

export default AgentsPage;

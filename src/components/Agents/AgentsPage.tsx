
import NavBar from '../layout/NavBar';
import { AgentsDisplay } from './AgentsDisplay';

const AgentsPage = () => {
  return (

    <div className="min-h-screen bg-black">
        <NavBar/>
        <AgentsDisplay />
    </div>
  );
};

export default AgentsPage;
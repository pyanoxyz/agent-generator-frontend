import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

const DeployButton = () => {
 const showToast = useToast((state) => state.showToast);
 const { isConnected } = useAccount();
 const navigate = useNavigate();

 const handleDeploy = () => {
   if (!isConnected) {
     showToast("Please connect your wallet to deploy", "error");
     return;
   }
   navigate('/deploy_agents');
 };

 return (
   <button
     onClick={handleDeploy}
     className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
   >
     Deploy
   </button>
 );
};

export default DeployButton;
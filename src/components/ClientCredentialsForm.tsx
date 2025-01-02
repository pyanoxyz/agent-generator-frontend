import { useState } from 'react';
import { ClientCredentials } from './DeployButton';

interface Props {
 selectedClient: string;
 onSubmit: (credentials: ClientCredentials) => void;
}

export const ClientCredentialsForm = ({ selectedClient, onSubmit }: Props) => {
 const [credentials, setCredentials] = useState<ClientCredentials>({});
 
 const renderTwitterForm = () => (
    <div className="space-y-4">
      <input
        type="text" 
        placeholder="Twitter Username"
        className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg"
        onChange={e => {
          const twitter = credentials.twitter || { username: '', password: '' };
          setCredentials({
            ...credentials,
            twitter: { ...twitter, username: e.target.value }
          });
        }}
      />
      <input
        type="password"
        placeholder="Twitter Password" 
        className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg"
        onChange={e => {
          const twitter = credentials.twitter || { username: '', password: '' };
          setCredentials({
            ...credentials,
            twitter: { ...twitter, password: e.target.value }
          });
        }}
      />
    </div>
 );

 return (
   <div className="space-y-4">
     <h3 className="text-lg font-medium text-blue-500">
       {selectedClient} Credentials
     </h3>
     {selectedClient === 'twitter' && renderTwitterForm()}
     {/* Add other client forms */}
     <button 
       onClick={() => onSubmit(credentials)}
       className="w-full px-4 py-2 bg-blue-600 rounded-lg"
     >
       Submit
     </button>
   </div>
 );
};
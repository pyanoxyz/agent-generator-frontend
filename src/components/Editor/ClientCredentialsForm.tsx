import React, { useState } from 'react';

// Define specific credential interfaces for each platform
export interface TwitterCredentials {
  username: string;
  password: string;
  email: string;
}

export interface DiscordCredentials {
  DISCORD_APPLICATION_ID: string;
  DISCORD_API_TOKEN: string;
}

export interface TelegramCredentials {
  TELEGRAM_BOT_TOKEN: string;
}

// Combined interface for all client credentials
export interface ClientCredentials {
  client_twitter?: TwitterCredentials;
  client_discord?: DiscordCredentials;
  client_telegram?: TelegramCredentials;
}

interface ClientCredentialsFormProps {
  onSubmit: (credentials: ClientCredentials) => void;
  selectedClients: string[];
}

const ClientCredentialsForm = ({ onSubmit, selectedClients }: ClientCredentialsFormProps) => {
  // Initialize state with nested structure for each platform's credentials
  const [credentials, setCredentials] = useState<ClientCredentials>({
    client_twitter: selectedClients.includes('twitter') ? { username: '', password: '', email: '' } : undefined,
    client_discord: selectedClients.includes('discord') ? { DISCORD_APPLICATION_ID: '', DISCORD_API_TOKEN: '' } : undefined,
    client_telegram: selectedClients.includes('telegram') ? { TELEGRAM_BOT_TOKEN: '' } : undefined
  });

  // Helper function to update nested credential values
  const updateCredential = (platform: string, field: string, value: string) => {
    setCredentials(prev => {
      const newCreds = { ...prev };
      
      // Initialize the platform object if it doesn't exist
      if (!newCreds[`client_${platform}` as keyof ClientCredentials]) {
        if (platform === 'twitter') {
          newCreds.client_twitter = { username: '', password: '', email: '' };
        } else if (platform === 'discord') {
          newCreds.client_discord = { DISCORD_APPLICATION_ID: '', DISCORD_API_TOKEN: '' };
        } else if (platform === 'telegram') {
          newCreds.client_telegram = { TELEGRAM_BOT_TOKEN: '' };
        }
      }

      // Update the specific field
      if (platform === 'twitter' && newCreds.client_twitter) {
        newCreds.client_twitter = {
          ...newCreds.client_twitter,
          [field]: value
        };
      } else if (platform === 'discord' && newCreds.client_discord) {
        newCreds.client_discord = {
          ...newCreds.client_discord,
          [field]: value
        };
      } else if (platform === 'telegram' && newCreds.client_telegram) {
        newCreds.client_telegram = {
          ...newCreds.client_telegram,
          [field]: value
        };
      }

      return newCreds;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  const renderInput = (
    label: string,
    type: string,
    platform: string,
    field: string,
    value: string,
    required: boolean = true
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => updateCredential(platform, field, e.target.value)}
        className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg text-white 
          focus:border-blue-500/50 outline-none transition-colors"
        placeholder={`Enter ${label.toLowerCase()}`}
        required={required}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-black/30 p-6 rounded-lg border border-gray-800">
      <div className="space-y-8">
        {/* Twitter Fields */}
        {selectedClients.includes('twitter') && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-400">Twitter Credentials</h3>
            <div className="space-y-4">
              {renderInput(
                'Username',
                'text',
                'twitter',
                'username',
                credentials.client_twitter?.username || ''
              )}
              {renderInput(
                'Password',
                'password',
                'twitter',
                'password',
                credentials.client_twitter?.password || ''
              )}
              {renderInput(
                'Email',
                'email',
                'twitter',
                'email',
                credentials.client_twitter?.email || ''
              )}
            </div>
          </div>
        )}

        {/* Discord Fields */}
        {selectedClients.includes('discord') && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-400">Discord Credentials</h3>
            <div className="space-y-4">
              {renderInput(
                'Application ID',
                'text',
                'discord',
                'DISCORD_APPLICATION_ID',
                credentials.client_discord?.DISCORD_APPLICATION_ID || ''
              )}
              {renderInput(
                'API Token',
                'password',
                'discord',
                'DISCORD_API_TOKEN',
                credentials.client_discord?.DISCORD_API_TOKEN || ''
              )}
            </div>
          </div>
        )}

        {/* Telegram Fields */}
        {selectedClients.includes('telegram') && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-400">Telegram Credentials</h3>
            <div className="space-y-4">
              {renderInput(
                'Bot Token',
                'password',
                'telegram',
                'TELEGRAM_BOT_TOKEN',
                credentials.client_telegram?.TELEGRAM_BOT_TOKEN || ''
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t border-gray-800">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
        >
          Submit Credentials and Deploy
        </button>
      </div>
    </form>
  );
};

export default ClientCredentialsForm;
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

export interface ClientCredentials {
  client_twitter?: TwitterCredentials;
  client_discord?: DiscordCredentials;
  client_telegram?: TelegramCredentials;
}
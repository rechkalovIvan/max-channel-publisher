export const config = {
  botToken: process.env.BOT_TOKEN,
  channelChatId: process.env.CHANNEL_CHAT_ID ? Number(process.env.CHANNEL_CHAT_ID) : undefined,
  buttonText: process.env.BUTTON_TEXT || 'Написать боту',
  buttonUrl: process.env.BUTTON_URL,
  adminUserId: process.env.ADMIN_USER_ID,
  nodeEnv: process.env.NODE_ENV || 'development'
};

export function validateConfig() {
  const required = ['botToken', 'channelChatId', 'buttonUrl'];
  const missing = required.filter((key) => !config[key]);

  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

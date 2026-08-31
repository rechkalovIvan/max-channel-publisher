import { Bot } from '@maxhub/max-bot-api';
import { config } from './config.js';
import { handleMessageCreated } from './handlers/messageCreated.js';

export function createBot() {
  const bot = new Bot(config.botToken, {
    clientOptions: {
      baseUrl: config.maxApiBaseUrl
    }
  });

  bot.on('message_created', handleMessageCreated);

  return bot;
}

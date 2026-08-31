import { Keyboard } from '@maxhub/max-bot-api';
import { config } from '../config.js';

const MAX_SEND_ATTEMPTS = 4;
const RETRY_DELAYS_MS = [500, 1_000, 2_000];

function buildKeyboard() {
  return Keyboard.inlineKeyboard([
    [Keyboard.button.link(config.buttonText, config.buttonUrl)]
  ]);
}

function isRetryableNetworkError(error) {
  const code = error?.cause?.code || error?.code;

  return [
    'ECONNRESET',
    'ECONNREFUSED',
    'EAI_AGAIN',
    'ENETUNREACH',
    'ETIMEDOUT'
  ].includes(code);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function publishPost(api, messageData) {
  const attachments = [...(messageData.mediaAttachments || [])];
  attachments.push(buildKeyboard());

  for (let attempt = 1; attempt <= MAX_SEND_ATTEMPTS; attempt += 1) {
    try {
      return await api.sendMessageToChat(
        config.channelChatId,
        messageData.text || '',
        { attachments }
      );
    } catch (error) {
      const isLastAttempt = attempt === MAX_SEND_ATTEMPTS;

      if (isLastAttempt || !isRetryableNetworkError(error)) {
        throw error;
      }

      const delay = RETRY_DELAYS_MS[attempt - 1];
      console.warn(
        `Failed to publish post (attempt ${attempt}/${MAX_SEND_ATTEMPTS}; ${error.cause?.code || error.code}). Retrying in ${delay}ms.`
      );
      await wait(delay);
    }
  }
}

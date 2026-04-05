import { Keyboard } from '@maxhub/max-bot-api';
import { config } from '../config.js';

function buildKeyboard() {
  return Keyboard.inlineKeyboard([
    [Keyboard.button.link(config.buttonText, config.buttonUrl)]
  ]);
}

export async function publishPost(api, messageData) {
  const attachments = [...(messageData.mediaAttachments || [])];
  attachments.push(buildKeyboard());

  const response = await api.sendMessageToChat(
    config.channelChatId,
    messageData.text || '',
    { attachments }
  );

  return response;
}

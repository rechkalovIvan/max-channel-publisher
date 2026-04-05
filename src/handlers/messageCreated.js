import { isAdmin } from '../services/accessService.js';
import { publishPost } from '../services/publishService.js';
import { prepareMediaAttachment } from '../services/mediaService.js';
import { extractMessageData } from '../utils/extractMessageData.js';
import { config } from '../config.js';

export async function handleMessageCreated(ctx) {
  try {
    const chatId = ctx.chatId;

    if (chatId === config.channelChatId) {
      return;
    }

    const senderId = String(ctx.user?.user_id || '');

    if (!isAdmin(senderId)) {
      await ctx.reply('У вас нет доступа к этому боту.');
      return;
    }

    const messageData = extractMessageData(ctx);

    if (!messageData.text && !messageData.media) {
      await ctx.reply('Отправьте текст поста.');
      return;
    }

    let mediaAttachments = [];

    if (messageData.media) {
      const mediaAttachment = await prepareMediaAttachment(ctx.api, messageData.media);
      if (mediaAttachment) {
        mediaAttachments.push(mediaAttachment);
      }
    }

    await publishPost(ctx.api, {
      text: messageData.text,
      mediaAttachments
    });

    await ctx.reply('Пост опубликован в канал.');
  } catch (error) {
    console.error('message_created error:', error);
    await ctx.reply('Не удалось опубликовать пост. Проверьте логи контейнера.');
  }
}

export function extractMessageData(ctx) {
  const text = ctx.message?.body?.text?.trim?.() || '';

  const rawAttachments = ctx.message?.body?.attachments || [];

  let media = null;

  for (const attachment of rawAttachments) {
    const type = attachment?.type;
    const token = attachment?.payload?.token;

    if (type === 'image' && token) {
      media = {
        type: 'image',
        source: { token }
      };
      break;
    }

    if (type === 'video' && token) {
      media = {
        type: 'video',
        source: { token }
      };
      break;
    }
  }

  return {
    text,
    media,
    rawMessage: ctx.message
  };
}

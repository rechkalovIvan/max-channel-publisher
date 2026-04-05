import { ImageAttachment, VideoAttachment } from '@maxhub/max-bot-api';

export async function prepareMediaAttachment(api, mediaInfo) {
  if (!mediaInfo) {
    return null;
  }

  const { type, source } = mediaInfo;

  if (type === 'image') {
    if (source.url) {
      const uploaded = await api.uploadImage({ url: source.url });
      return uploaded.toJson();
    }
    if (source.filePath) {
      const uploaded = await api.uploadImage({ source: source.filePath });
      return uploaded.toJson();
    }
    if (source.token) {
      return new ImageAttachment({ token: source.token }).toJson();
    }
    throw new Error('Image source must have url, filePath, or token');
  }

  if (type === 'video') {
    if (source.filePath) {
      const uploaded = await api.uploadVideo({ source: source.filePath });
      return uploaded.toJson();
    }
    if (source.token) {
      return new VideoAttachment({ token: source.token }).toJson();
    }
    throw new Error('Video source must have filePath or token');
  }

  throw new Error(`Unsupported media type: ${type}`);
}

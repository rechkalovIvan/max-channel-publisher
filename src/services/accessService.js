import { config } from '../config.js';

export function isAdmin(senderId) {
  if (!config.adminUserId) return true;
  const adminIds = config.adminUserId.split(',').map(id => id.trim());
  return adminIds.includes(String(senderId));
}

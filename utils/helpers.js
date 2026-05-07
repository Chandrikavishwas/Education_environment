import { CONTENT_STATUS } from './constants';

// Format an ISO date string to a readable local time
export function formatDateTime(isoString) {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Format bytes to human-readable size
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Derive content schedule status from start/end times
export function getScheduleStatus(startTime, endTime) {
  const now = Date.now();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (now < start) return 'scheduled';
  if (now > end) return 'expired';
  return 'active';
}

// Check if a content item is currently live (approved + active time window)
export function isContentLive(item) {
  return (
    item.status === CONTENT_STATUS.APPROVED &&
    getScheduleStatus(item.startTime, item.endTime) === 'active'
  );
}

// Generate a simple unique ID
export function generateId() {
  return `content-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// Safely parse JSON without throwing
export function safeParseJSON(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}


import { CONTENT_STATUS, STORAGE_KEYS } from '@/utils/constants';
import { getAllContent, saveAllContent } from '@/utils/mockData';
import { generateId } from '@/utils/helpers';

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const contentService = {
  // Teacher: upload new content
  async uploadContent(formData, user) {
    await delay(800);

    const file = formData.file;
   
    // Here we create a local object URL for preview.
    const fileUrl = URL.createObjectURL(file);

    const newItem = {
      id: generateId(),
      teacherId: user.id,
      teacherName: user.name,
      title: formData.title,
      subject: formData.subject,
      description: formData.description || '',
      fileUrl,
      fileName: file.name,
      fileType: file.type,
      status: CONTENT_STATUS.PENDING,
      startTime: formData.startTime,
      endTime: formData.endTime,
      rotationDuration: Number(formData.rotationDuration) || 30,
      rejectionReason: null,
      createdAt: new Date().toISOString(),
    };

    const items = getAllContent();
    saveAllContent([newItem, ...items]);
    return newItem;
  },

  // Teacher: get own content
  async getMyContent(teacherId) {
    await delay();
    const items = getAllContent();
    return items.filter((c) => c.teacherId === teacherId);
  },

  // Teacher: get stats for own content
  async getMyStats(teacherId) {
    await delay(300);
    const items = getAllContent().filter((c) => c.teacherId === teacherId);
    return {
      total: items.length,
      pending: items.filter((c) => c.status === CONTENT_STATUS.PENDING).length,
      approved: items.filter((c) => c.status === CONTENT_STATUS.APPROVED).length,
      rejected: items.filter((c) => c.status === CONTENT_STATUS.REJECTED).length,
    };
  },

  // Principal: get all content
  async getAllContent() {
    await delay();
    return getAllContent();
  },

  // Principal: get aggregate stats
  async getStats() {
    await delay(300);
    const items = getAllContent();
    return {
      total: items.length,
      pending: items.filter((c) => c.status === CONTENT_STATUS.PENDING).length,
      approved: items.filter((c) => c.status === CONTENT_STATUS.APPROVED).length,
      rejected: items.filter((c) => c.status === CONTENT_STATUS.REJECTED).length,
    };
  },

  // Public: get currently live content for a teacher
  async getLiveContent(teacherId) {
    await delay(400);
    const items = getAllContent();
    const now = Date.now();
    return items.filter(
      (c) =>
        c.teacherId === teacherId &&
        c.status === CONTENT_STATUS.APPROVED &&
        new Date(c.startTime).getTime() <= now &&
        new Date(c.endTime).getTime() >= now
    );
  },
};

export default contentService;

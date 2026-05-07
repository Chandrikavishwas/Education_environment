
import { CONTENT_STATUS } from '@/utils/constants';
import { getAllContent, saveAllContent } from '@/utils/mockData';

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const approvalService = {
  // Principal: get all pending items
  async getPendingContent() {
    await delay();
    return getAllContent().filter((c) => c.status === CONTENT_STATUS.PENDING);
  },

  // Principal: approve a content item
  async approveContent(contentId) {
    await delay();
    const items = getAllContent();
    const updated = items.map((c) =>
      c.id === contentId
        ? { ...c, status: CONTENT_STATUS.APPROVED, rejectionReason: null }
        : c
    );
    saveAllContent(updated);
    return updated.find((c) => c.id === contentId);
  },

  // Principal: reject a content item with a mandatory reason
  async rejectContent(contentId, reason) {
    await delay();
    const items = getAllContent();
    const updated = items.map((c) =>
      c.id === contentId
        ? { ...c, status: CONTENT_STATUS.REJECTED, rejectionReason: reason }
        : c
    );
    saveAllContent(updated);
    return updated.find((c) => c.id === contentId);
  },
};

export default approvalService;

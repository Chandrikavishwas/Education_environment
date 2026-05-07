'use client';

import { useState, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import PrincipalLayout from '@/layouts/PrincipalLayout';
import ContentTable from '@/components/principal/ContentTable';
import ContentFilters from '@/components/principal/ContentFilters';
import ApprovalModal from '@/components/principal/ApprovalModal';
import PageHeader from '@/components/shared/PageHeader';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { useContent } from '@/hooks/useContent';
import { useAuth } from '@/hooks/useAuth';
import contentService from '@/services/content.service';
import approvalService from '@/services/approval.service';

export default function AllContentPage() {
  useAuth('principal');

  const fetchAll = useCallback(() => contentService.getAllContent(), []);
  const { data: items, loading, error, refetch } = useContent(fetchAll);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Client-side filtering — efficient for the dataset sizes described
  const filtered = useMemo(() => {
    if (!items) return [];
    let result = items;

    if (status) {
      result = result.filter((c) => c.status === status);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.teacherName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, search, status]);

  async function handleApprove(contentId) {
    setActionLoading('approve');
    try {
      await approvalService.approveContent(contentId);
      toast.success('Content approved!');
      setSelectedItem(null);
      refetch();
    } catch {
      toast.error('Failed to approve. Please try again.');
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(contentId, reason) {
    setActionLoading('reject');
    try {
      await approvalService.rejectContent(contentId, reason);
      toast.success('Content rejected.');
      setSelectedItem(null);
      refetch();
    } catch {
      toast.error('Failed to reject. Please try again.');
    } finally {
      setActionLoading(null);
    }
  }

  if (error) return (
    <PrincipalLayout>
      <ErrorMessage message={error} onRetry={refetch} />
    </PrincipalLayout>
  );

  return (
    <PrincipalLayout>
      <PageHeader
        title="All Content"
        subtitle={loading ? 'Loading…' : `${filtered.length} of ${items?.length ?? 0} items`}
      />

      <div className="mb-4">
        <ContentFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />
      </div>

      <ContentTable
        items={filtered}
        loading={loading}
        onReview={(item) => setSelectedItem(item)}
      />

      <ApprovalModal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        contentItem={selectedItem}
        onApprove={handleApprove}
        onReject={handleReject}
        loading={actionLoading}
      />
    </PrincipalLayout>
  );
}

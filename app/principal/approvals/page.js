'use client';

import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import PrincipalLayout from '@/layouts/PrincipalLayout';
import ContentTable from '@/components/principal/ContentTable';
import ApprovalModal from '@/components/principal/ApprovalModal';
import PageHeader from '@/components/shared/PageHeader';
import EmptyState from '@/components/shared/EmptyState';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { useContent } from '@/hooks/useContent';
import { useAuth } from '@/hooks/useAuth';
import approvalService from '@/services/approval.service';
import { ClipboardCheck } from 'lucide-react';

export default function ApprovalsPage() {
  useAuth('principal');

  const fetchPending = useCallback(() => approvalService.getPendingContent(), []);
  const { data: items, loading, error, refetch } = useContent(fetchPending);

  const [selectedItem, setSelectedItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // 'approve' | 'reject' | null

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

  const isEmpty = !loading && items?.length === 0;

  return (
    <PrincipalLayout>
      <PageHeader
        title="Pending Approvals"
        subtitle={loading ? 'Loading…' : `${items?.length ?? 0} items awaiting review`}
      />

      {isEmpty ? (
        <EmptyState
          icon={ClipboardCheck}
          title="All caught up!"
          description="There are no content items waiting for approval."
        />
      ) : (
        <ContentTable
          items={items}
          loading={loading}
          onReview={(item) => setSelectedItem(item)}
        />
      )}

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

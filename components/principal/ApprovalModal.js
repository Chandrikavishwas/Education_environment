'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rejectionSchema } from '@/utils/validators';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function ApprovalModal({ isOpen, onClose, contentItem, onApprove, onReject, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(rejectionSchema) });

  function handleReject(data) {
    onReject(contentItem.id, data.reason);
    reset();
  }

  function handleApprove() {
    onApprove(contentItem.id);
  }

  function handleClose() {
    reset();
    onClose();
  }

  if (!contentItem) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Review Content" maxWidth="max-w-lg">
      {/* Content preview */}
      <div className="mb-5 rounded-xl overflow-hidden border border-gray-100">
        {contentItem.fileUrl ? (
          <img
            src={contentItem.fileUrl}
            alt={contentItem.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No preview
          </div>
        )}
      </div>

      <div className="mb-5 space-y-1">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
          {contentItem.subject}
        </p>
        <h3 className="font-semibold text-gray-900">{contentItem.title}</h3>
        {contentItem.description && (
          <p className="text-sm text-gray-500">{contentItem.description}</p>
        )}
        <p className="text-xs text-gray-400">by {contentItem.teacherName}</p>
      </div>

      {/* Approve action */}
      <div className="mb-5">
        <Button
          variant="success"
          className="w-full"
          loading={loading === 'approve'}
          disabled={Boolean(loading)}
          onClick={handleApprove}
        >
          Approve
        </Button>
      </div>

      {/* Reject with reason */}
      <form onSubmit={handleSubmit(handleReject)} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Rejection reason <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Explain why this content is being rejected…"
            rows={3}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400 ${
              errors.reason ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}
            {...register('reason')}
          />
          {errors.reason && (
            <p className="text-xs text-red-600 mt-1">{errors.reason.message}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="danger"
          className="w-full"
          loading={loading === 'reject'}
          disabled={Boolean(loading)}
        >
          Reject
        </Button>
      </form>
    </Modal>
  );
}

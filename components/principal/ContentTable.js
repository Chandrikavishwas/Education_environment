'use client';

import { Eye } from 'lucide-react';
import { ContentStatusBadge, ScheduleBadge } from '@/components/shared/StatusBadge';
import { formatDateTime } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/shared/EmptyState';
import { SkeletonTable } from '@/components/ui/Skeleton';

export default function ContentTable({ items, loading, onReview }) {
  if (loading) return <SkeletonTable rows={6} />;

  if (!items?.length) {
    return (
      <EmptyState
        title="No content found"
        description="Try adjusting the search or filter."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                Content
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden sm:table-cell">
                Teacher
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">
                Schedule
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {item.fileUrl && (
                      <img
                        src={item.fileUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate max-w-xs">{item.title}</p>
                      <p className="text-xs text-indigo-600">{item.subject}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                  {item.teacherName}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div>{formatDateTime(item.startTime)}</div>
                    <div className="text-gray-400">→ {formatDateTime(item.endTime)}</div>
                  </div>
                  <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
                </td>
                <td className="px-4 py-3">
                  <ContentStatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  {onReview && item.status === 'pending' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onReview(item)}
                      className="gap-1.5"
                    >
                      <Eye size={13} /> Review
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

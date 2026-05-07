'use client';

import Image from 'next/image';
import { Calendar, Clock, RotateCcw } from 'lucide-react';
import { ContentStatusBadge, ScheduleBadge } from './StatusBadge';
import { formatDateTime } from '@/utils/helpers';

export default function ContentCard({ item, actions }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image preview */}
      <div className="relative h-44 bg-gray-100">
        {item.fileUrl ? (
          <img
            src={item.fileUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No preview
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <ContentStatusBadge status={item.status} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
          {item.subject}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1 line-clamp-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
        )}

        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} /> {formatDateTime(item.startTime)}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} /> {formatDateTime(item.endTime)}
          </div>
          {item.rotationDuration && (
            <div className="flex items-center gap-1.5">
              <RotateCcw size={12} /> {item.rotationDuration}s rotation
            </div>
          )}
        </div>

        <div className="mt-2">
          <ScheduleBadge startTime={item.startTime} endTime={item.endTime} />
        </div>

        {/* Rejection reason */}
        {item.status === 'rejected' && item.rejectionReason && (
          <div className="mt-3 p-2.5 bg-red-50 rounded-lg border border-red-100">
            <p className="text-xs font-medium text-red-700 mb-0.5">Rejection reason</p>
            <p className="text-xs text-red-600">{item.rejectionReason}</p>
          </div>
        )}

        {/* Action buttons */}
        {actions && <div className="mt-4 flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}

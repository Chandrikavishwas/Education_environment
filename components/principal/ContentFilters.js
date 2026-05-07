'use client';

import { Search } from 'lucide-react';
import Select from '@/components/ui/Select';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function ContentFilters({ search, status, onSearchChange, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, subject, or teacher…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Status filter */}
      <Select
        options={STATUS_OPTIONS}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="sm:w-44"
      />
    </div>
  );
}

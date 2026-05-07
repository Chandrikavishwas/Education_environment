'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import TeacherLayout from '@/layouts/TeacherLayout';
import MyContentList from '@/components/teacher/MyContentList';
import PageHeader from '@/components/shared/PageHeader';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/hooks/useContent';
import contentService from '@/services/content.service';
import { Upload } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function MyContentPage() {
  const { user } = useAuth('teacher');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchContent = useCallback(
    () => contentService.getMyContent(user?.id),
    [user?.id]
  );

  const { data: items, loading, error, refetch } = useContent(fetchContent, [user?.id]);

  const filtered = statusFilter
    ? items?.filter((c) => c.status === statusFilter)
    : items;

  return (
    <TeacherLayout>
      <PageHeader
        title="My Content"
        subtitle={`${items?.length ?? 0} total uploads`}
        actions={
          <div className="flex items-center gap-2">
            <Select
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-36"
            />
            <Link href="/teacher/upload">
              <Button size="sm">
                <Upload size={13} /> Upload
              </Button>
            </Link>
          </div>
        }
      />

      <MyContentList
        items={filtered}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
    </TeacherLayout>
  );
}

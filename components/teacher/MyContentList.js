'use client';

import { BookOpen } from 'lucide-react';
import ContentCard from '@/components/shared/ContentCard';
import EmptyState from '@/components/shared/EmptyState';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { SkeletonCard } from '@/components/ui/Skeleton';

export default function MyContentList({ items, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;

  if (!items?.length) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No content yet"
        description="Upload your first piece of content to get started."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
}

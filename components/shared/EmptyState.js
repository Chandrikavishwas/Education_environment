import { Inbox } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = '',
  actionLabel = null,
  onAction = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 bg-gray-100 rounded-2xl mb-4">
        <Icon size={32} className="text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-xs">{description}</p>}
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}

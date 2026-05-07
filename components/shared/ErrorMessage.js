import { AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-3 bg-red-50 rounded-2xl mb-3">
        <AlertCircle size={28} className="text-red-500" />
      </div>
      <p className="text-sm font-semibold text-gray-800 mb-1">Something went wrong</p>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

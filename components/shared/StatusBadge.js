import Badge from '@/components/ui/Badge';
import { getScheduleStatus } from '@/utils/helpers';

export function ContentStatusBadge({ status }) {
  const LABELS = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };
  return <Badge label={LABELS[status] ?? status} variant={status} dot />;
}

export function ScheduleBadge({ startTime, endTime }) {
  const status = getScheduleStatus(startTime, endTime);
  const LABELS = { scheduled: 'Scheduled', active: 'Active', expired: 'Expired' };
  return <Badge label={LABELS[status]} variant={status} dot />;
}

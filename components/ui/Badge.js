const VARIANTS = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  scheduled: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  expired: 'bg-gray-100 text-gray-600',
  default: 'bg-gray-100 text-gray-700',
};

const DOTS = {
  pending: 'bg-amber-500',
  approved: 'bg-emerald-500',
  rejected: 'bg-red-500',
  scheduled: 'bg-blue-500',
  active: 'bg-green-500',
  expired: 'bg-gray-400',
  default: 'bg-gray-400',
};

export default function Badge({ label, variant = 'default', dot = false }) {
  const variantKey = VARIANTS[variant] ? variant : 'default';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${VARIANTS[variantKey]}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${DOTS[variantKey]}`} />
      )}
      {label}
    </span>
  );
}

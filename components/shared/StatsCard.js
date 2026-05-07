import { SkeletonCard } from '@/components/ui/Skeleton';

export default function StatsCard({ label, value, icon: Icon, color = 'indigo', loading = false }) {
  const COLOR_MAP = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-100' },
    amber:  { bg: 'bg-amber-50',  text: 'text-amber-600',  ring: 'ring-amber-100'  },
    emerald:{ bg: 'bg-emerald-50',text: 'text-emerald-600',ring: 'ring-emerald-100'},
    red:    { bg: 'bg-red-50',    text: 'text-red-600',    ring: 'ring-red-100'    },
  };

  const colors = COLOR_MAP[color] ?? COLOR_MAP.indigo;

  if (loading) return <SkeletonCard />;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ring-1 ${colors.bg} ${colors.ring}`}>
        {Icon && <Icon size={22} className={colors.text} />}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value ?? '—'}</p>
      </div>
    </div>
  );
}

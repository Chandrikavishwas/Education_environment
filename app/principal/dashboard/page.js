'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { LayoutDashboard, ClipboardCheck, List, CheckCircle, XCircle, Clock } from 'lucide-react';
import PrincipalLayout from '@/layouts/PrincipalLayout';
import StatsCard from '@/components/shared/StatsCard';
import PageHeader from '@/components/shared/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/hooks/useContent';
import contentService from '@/services/content.service';

export default function PrincipalDashboard() {
  const { user } = useAuth('principal');

  const fetchStats = useCallback(() => contentService.getStats(), []);
  const { data: stats, loading } = useContent(fetchStats);

  return (
    <PrincipalLayout>
      <PageHeader
        title={`Welcome, ${user?.name?.split(' ')[0] ?? 'Principal'} 👋`}
        subtitle="Overview of all content across the school"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Content" value={stats?.total}    icon={LayoutDashboard} color="indigo"  loading={loading} />
        <StatsCard label="Pending"       value={stats?.pending}  icon={Clock}           color="amber"   loading={loading} />
        <StatsCard label="Approved"      value={stats?.approved} icon={CheckCircle}     color="emerald" loading={loading} />
        <StatsCard label="Rejected"      value={stats?.rejected} icon={XCircle}         color="red"     loading={loading} />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickLink
          href="/principal/approvals"
          icon={ClipboardCheck}
          badge={stats?.pending}
          title="Pending Approvals"
          description="Review and approve or reject submitted content"
          color="amber"
        />
        <QuickLink
          href="/principal/all-content"
          icon={List}
          title="All Content"
          description="Browse and filter all content across the school"
          color="violet"
        />
      </div>
    </PrincipalLayout>
  );
}

function QuickLink({ href, icon: Icon, title, description, color, badge }) {
  const colors = {
    amber:  'bg-amber-50 text-amber-600',
    violet: 'bg-violet-50 text-violet-600',
  };
  return (
    <Link
      href={href}
      className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow group"
    >
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{title}</p>
          {badge > 0 && (
            <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </Link>
  );
}

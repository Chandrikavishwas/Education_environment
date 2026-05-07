'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Upload, BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react';
import TeacherLayout from '@/layouts/TeacherLayout';
import StatsCard from '@/components/shared/StatsCard';
import PageHeader from '@/components/shared/PageHeader';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/hooks/useContent';
import contentService from '@/services/content.service';

export default function TeacherDashboard() {
  const { user } = useAuth('teacher');

  const fetchStats = useCallback(
    () => contentService.getMyStats(user?.id),
    [user?.id]
  );

  const { data: stats, loading } = useContent(fetchStats, [user?.id]);

  return (
    <TeacherLayout>
      <PageHeader
        title={`Welcome, ${user?.name?.split(' ')[0] ?? 'Teacher'} 👋`}
        subtitle="Here's an overview of your content"
        actions={
          <Link href="/teacher/upload">
            <Button>
              <Upload size={15} /> Upload Content
            </Button>
          </Link>
        }
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Uploads" value={stats?.total} icon={LayoutDashboard} color="indigo" loading={loading} />
        <StatsCard label="Pending"       value={stats?.pending}  icon={Clock}         color="amber"   loading={loading} />
        <StatsCard label="Approved"      value={stats?.approved} icon={CheckCircle}   color="emerald" loading={loading} />
        <StatsCard label="Rejected"      value={stats?.rejected} icon={XCircle}       color="red"     loading={loading} />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickLink
          href="/teacher/upload"
          icon={Upload}
          title="Upload New Content"
          description="Share educational material with your students"
          color="indigo"
        />
        <QuickLink
          href="/teacher/my-content"
          icon={BookOpen}
          title="View My Content"
          description="Track the status of all your uploaded content"
          color="violet"
        />
      </div>
    </TeacherLayout>
  );
}

function QuickLink({ href, icon: Icon, title, description, color }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
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
      <div>
        <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </Link>
  );
}

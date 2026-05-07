'use client';

import { useRouter } from 'next/navigation';
import TeacherLayout from '@/layouts/TeacherLayout';
import UploadForm from '@/components/teacher/UploadForm';
import PageHeader from '@/components/shared/PageHeader';

export default function UploadPage() {
  const router = useRouter();

  function handleSuccess() {
    // After successful upload, take user to their content list
    router.push('/teacher/my-content');
  }

  return (
    <TeacherLayout>
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Upload Content"
          subtitle="Fill in the details below and upload your educational material for review."
        />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <UploadForm onSuccess={handleSuccess} />
        </div>

        {/* Info box */}
        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">Approval required</p>
          <p className="text-sm text-amber-700">
            All uploaded content is submitted for principal review before going live.
            You will be able to track the status on the My Content page.
          </p>
        </div>
      </div>
    </TeacherLayout>
  );
}

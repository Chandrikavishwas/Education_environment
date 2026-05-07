'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { uploadSchema, validateFile } from '@/utils/validators';
import { SUBJECTS } from '@/utils/constants';
import contentService from '@/services/content.service';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/shared/FileUpload';

export default function UploadForm({ onSuccess }) {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(uploadSchema) });

  async function onSubmit(data) {
    const validationError = validateFile(file);
    if (validationError) {
      setFileError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await contentService.uploadContent({ ...data, file }, user);
      toast.success('Content uploaded and awaiting approval!');
      reset();
      setFile(null);
      setFileError(null);
      onSuccess?.();
    } catch {
      toast.error('Upload failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleFileSelect(selected) {
    setFile(selected);
    if (selected) setFileError(null);
  }

  // Generate the minimum datetime-local value
  const nowLocal = new Date().toISOString().slice(0, 16);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Title *"
          placeholder="e.g. Introduction to Algebra"
          error={errors.title?.message}
          {...register('title')}
        />
        <Select
          label="Subject *"
          placeholder="Select a subject"
          options={SUBJECTS}
          error={errors.subject?.message}
          {...register('subject')}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
        <textarea
          placeholder="Brief description of the content (optional)"
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          {...register('description')}
        />
      </div>

      <FileUpload onFileSelect={handleFileSelect} error={fileError} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Start Time *"
          type="datetime-local"
          min={nowLocal}
          error={errors.startTime?.message}
          {...register('startTime')}
        />
        <Input
          label="End Time *"
          type="datetime-local"
          min={nowLocal}
          error={errors.endTime?.message}
          {...register('endTime')}
        />
        <Input
          label="Rotation (seconds)"
          type="number"
          min={1}
          placeholder="30"
          hint="How long each slide displays"
          error={errors.rotationDuration?.message}
          {...register('rotationDuration')}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" loading={submitting} size="lg">
          Upload Content
        </Button>
      </div>
    </form>
  );
}

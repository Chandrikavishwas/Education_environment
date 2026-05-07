import { z } from 'zod';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_BYTES } from './constants';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120, 'Title too long'),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().optional(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  rotationDuration: z.coerce
    .number()
    .int()
    .min(1, 'Must be at least 1 second')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => new Date(data.endTime) > new Date(data.startTime),
  { message: 'End time must be after start time', path: ['endTime'] }
);

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name too long'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['teacher', 'principal'], { required_error: 'Select a role' }),
});

export const rejectionSchema = z.object({
  reason: z.string().min(1, 'Rejection reason is required').max(500, 'Reason too long'),
});

export function validateFile(file) {
  if (!file) return 'File is required';
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'Only JPG, PNG, and GIF files are allowed';
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'File size must be under 10 MB';
  }
  return null;
}

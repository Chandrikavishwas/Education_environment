import { CONTENT_STATUS, STORAGE_KEYS } from './constants';

// Demo credentials shown on the login page
export const DEMO_USERS = [
  {
    id: 'teacher-1',
    name: 'Aman',
    email: 'teacher@school.com',
    password: 'password123',
    role: 'teacher',
  },
  {
    id: 'teacher-2',
    name: 'Vanugopal',
    email: 'teacher2@school.com',
    password: 'password123',
    role: 'teacher',
  },
  {
    id: 'principal-1',
    name: 'Chandra',
    email: 'principal@school.com',
    password: 'password123',
    role: 'principal',
  },
];

const now = new Date();
const pad = (d) => d.toISOString();
const hoursFromNow = (h) => new Date(now.getTime() + h * 3600000);

// Realistic seed content for demos
const SEED_CONTENT = [
  {
    id: 'content-1',
    teacherId: 'teacher-1',
    teacherName: 'Aman',
    title: 'Introduction to Quadratic Equations',
    subject: 'Mathematics',
    description: 'A beginner-friendly overview of quadratic equations and their real-world applications.',
    fileUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    fileName: 'algebra.jpg',
    fileType: 'image/jpeg',
    status: CONTENT_STATUS.APPROVED,
    startTime: pad(new Date(now.getTime() - 3600000)),
    endTime: pad(hoursFromNow(2)),
    rotationDuration: 30,
    rejectionReason: null,
    createdAt: pad(new Date(now.getTime() - 86400000)),
  },
  {
    id: 'content-2',
    teacherId: 'teacher-1',
    teacherName: 'Aman',
    title: 'Photosynthesis Explained',
    subject: 'Biology',
    description: 'Visual guide to understanding how plants convert sunlight to energy.',
    fileUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    fileName: 'photosynthesis.jpg',
    fileType: 'image/jpeg',
    status: CONTENT_STATUS.PENDING,
    startTime: pad(hoursFromNow(1)),
    endTime: pad(hoursFromNow(4)),
    rotationDuration: 20,
    rejectionReason: null,
    createdAt: pad(new Date(now.getTime() - 3600000)),
  },
  {
    id: 'content-3',
    teacherId: 'teacher-1',
    teacherName: 'Aman',
    title: 'The French Revolution',
    subject: 'History',
    description: 'Key events and figures from the French Revolution 1789–1799.',
    fileUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    fileName: 'history.jpg',
    fileType: 'image/jpeg',
    status: CONTENT_STATUS.REJECTED,
    startTime: pad(new Date(now.getTime() - 7200000)),
    endTime: pad(new Date(now.getTime() - 3600000)),
    rotationDuration: 45,
    rejectionReason: 'Content does not meet curriculum guidelines for Grade 9.',
    createdAt: pad(new Date(now.getTime() - 172800000)),
  },
  {
    id: 'content-4',
    teacherId: 'teacher-2',
    teacherName: 'Vanugopal',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    description: 'An interactive visual breakdown of all three laws of motion with examples.',
    fileUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80',
    fileName: 'physics.jpg',
    fileType: 'image/jpeg',
    status: CONTENT_STATUS.APPROVED,
    startTime: pad(new Date(now.getTime() - 1800000)),
    endTime: pad(hoursFromNow(3)),
    rotationDuration: 30,
    rejectionReason: null,
    createdAt: pad(new Date(now.getTime() - 43200000)),
  },
  {
    id: 'content-5',
    teacherId: 'teacher-2',
    teacherName: ' Vanugopal',
    title: 'Periodic Table Deep Dive',
    subject: 'Chemistry',
    description: 'Exploring groups, periods, and key elements of the periodic table.',
    fileUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    fileName: 'chemistry.jpg',
    fileType: 'image/jpeg',
    status: CONTENT_STATUS.PENDING,
    startTime: pad(hoursFromNow(2)),
    endTime: pad(hoursFromNow(5)),
    rotationDuration: 25,
    rejectionReason: null,
    createdAt: pad(new Date(now.getTime() - 7200000)),
  },
];

// Initialise localStorage with seed data on first run (client-side only)
export function seedStorageIfEmpty() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTENT)) {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(SEED_CONTENT));
  }
}

export function getAllContent() {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEYS.CONTENT);
  return raw ? JSON.parse(raw) : [];
}

export function saveAllContent(items) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(items));
}

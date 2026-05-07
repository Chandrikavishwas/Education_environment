import { Geist } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata = {
  title: 'EduBroadcast — Content Broadcasting System',
  description: 'Upload, approve, and broadcast educational content in real time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 text-gray-900 font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
      </body>
    </html>
  );
}

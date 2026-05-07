'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Upload, BookOpen, LogOut, Menu, X, GraduationCap, Radio,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teacher/upload', label: 'Upload Content', icon: Upload },
  { href: '/teacher/my-content', label: 'My Content', icon: BookOpen },
];

function NavLink({ href, label, icon: Icon, pathname, onClick }) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}

export default function TeacherLayout({ children }) {
  const { user, logout, loading } = useAuth('teacher');
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-30">
        <SidebarContent user={user} pathname={pathname} onLogout={logout} />
      </aside>

      {/* Sidebar — mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 inset-y-0 w-64 bg-white shadow-xl flex flex-col">
            <SidebarContent
              user={user}
              pathname={pathname}
              onLogout={logout}
              onNavClick={() => setSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-indigo-600" />
            <span className="font-semibold text-gray-900 text-sm">EduBroadcast</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({ user, pathname, onLogout, onNavClick }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="p-2 bg-indigo-600 rounded-xl">
          <Radio size={16} className="text-white" />
        </div>
        <span className="font-bold text-gray-900">EduBroadcast</span>
      </div>

      {/* User pill */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 flex-shrink-0">
            {user?.name?.[0] ?? 'T'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-400">Teacher</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            pathname={pathname}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* Live page link */}
      <div className="px-3 py-3 border-t border-gray-100">
        <Link
          href={`/live/${user?.id}`}
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <Radio size={16} />
          View Live Page
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors mt-1"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </>
  );
}

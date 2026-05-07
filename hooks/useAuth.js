'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

/**
 * useAuth — wraps AuthContext and adds optional role-based redirect.
 *
 * @param {string} [requiredRole] - 'teacher' | 'principal' — redirect if wrong role
 */
export function useAuth(requiredRole = null) {
  const { user, loading, login, logout, isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      // Wrong role: redirect to their own dashboard
      const dest =
        user?.role === 'principal' ? '/principal/dashboard' : '/teacher/dashboard';
      router.replace(dest);
    }
  }, [loading, isAuthenticated, user, requiredRole, router]);

  return { user, loading, login, logout, isAuthenticated };
}

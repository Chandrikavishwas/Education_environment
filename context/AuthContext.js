'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import { ROLES } from '@/utils/constants';
import { seedStorageIfEmpty } from '@/utils/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Rehydrate auth state from localStorage on mount
  useEffect(() => {
    seedStorageIfEmpty();
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const { user: loggedInUser } = await authService.login(email, password);
    setUser(loggedInUser);

    if (loggedInUser.role === ROLES.PRINCIPAL) {
      router.push('/principal/dashboard');
    } else {
      router.push('/teacher/dashboard');
    }

    return loggedInUser;
  }, [router]);

  const register = useCallback(async (name, email, password, role) => {
    const { user: newUser } = await authService.register(name, email, password, role);
    setUser(newUser);

    if (newUser.role === ROLES.PRINCIPAL) {
      router.push('/principal/dashboard');
    } else {
      router.push('/teacher/dashboard');
    }

    return newUser;
  }, [router]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    router.push('/login');
  }, [router]);

  const value = { user, loading, login, register, logout, isAuthenticated: Boolean(user) };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
}

/**
 * Auth Service — mock implementation backed by localStorage.
 * Replace the body of each function with real API calls when a backend exists.
 */

import { STORAGE_KEYS } from '@/utils/constants';
import { seedStorageIfEmpty } from '@/utils/mockData';
import { safeParseJSON } from '@/utils/helpers';

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const authService = {
  async login(email, password) {
    await delay();
    seedStorageIfEmpty();

    const users = safeParseJSON(localStorage.getItem(STORAGE_KEYS.USERS), []);
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = `mock-token-${user.id}-${Date.now()}`;
    const { password: _omit, ...safeUser } = user;

    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser));

    return { user: safeUser, token };
  },

  async register(name, email, password, role) {
    await delay();
    seedStorageIfEmpty();

    const users = safeParseJSON(localStorage.getItem(STORAGE_KEYS.USERS), []);
    if (users.find((u) => u.email === email)) {
      throw new Error('An account with this email already exists');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role,
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...users, newUser]));

    // Auto-login after registration
    return this.login(email, password);
  },

  async logout() {
    await delay(200);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    return safeParseJSON(localStorage.getItem(STORAGE_KEYS.USER), null);
  },

  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  isAuthenticated() {
    return Boolean(this.getToken() && this.getCurrentUser());
  },
};

export default authService;

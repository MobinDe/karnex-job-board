import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => {
    localStorage.setItem('karnex_token', token);
    localStorage.setItem('karnex_user', JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('karnex_token');
    localStorage.removeItem('karnex_user');
    set({ user: null, token: null });
  },
  initialize: () => {
    const token = localStorage.getItem('karnex_token');
    const userStr = localStorage.getItem('karnex_user');
    if (token && userStr) {
      try {
        set({ token, user: JSON.parse(userStr) });
      } catch {
        localStorage.removeItem('karnex_token');
        localStorage.removeItem('karnex_user');
      }
    }
  }
}));
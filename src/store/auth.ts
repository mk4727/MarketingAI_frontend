import { create } from 'zustand';
import { api, setToken } from '@/lib/api';

interface AppUser {
  id: string;
  fullName: string;
  email: string;
  avatarInitials: string;
  isAdmin?: boolean;
}

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setInitialized: (initialized) => set({ initialized }),
  init: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ initialized: true, loading: false, user: null });
      return;
    }
    try {
      const data = await api.auth.me();
      set({ user: data.user, initialized: true, loading: false });
    } catch {
      setToken(null);
      set({ user: null, initialized: true, loading: false });
    }
  },
  login: async (email, password) => {
    const data = await api.auth.login({ email, password });
    setToken(data.token);
    set({ user: data.user });
  },
  signup: async (fullName, email, password) => {
    const data = await api.auth.signup({ fullName, email, password });
    setToken(data.token);
    set({ user: data.user });
  },
  signOut: () => {
    setToken(null);
    set({ user: null });
  },
}));

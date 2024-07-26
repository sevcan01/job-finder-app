import create from 'zustand';

interface AuthState {
  user: { email: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email, password) => {
    // API çağrısı burada gerçekleştir
    set({ user: { email } });
  },
  logout: () => set({ user: null }),
}));

export default useAuthStore;

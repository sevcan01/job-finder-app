import create from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  login: (email: string, password: string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  login: async (email: string, password: string) => {
    try {
      const response = await fetch('https://novel-project-ntj8t.ampt.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      set({ accessToken: data.accessToken });
    } catch (error) {
      console.error('Login failed:', error);
    }
  },
}));

export default useAuthStore;

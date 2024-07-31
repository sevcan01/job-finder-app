import { create } from 'zustand';
import { Job } from '../api/job';

interface JobStore {
  appliedJobs: Job[];
  searchQuery: string;
  isApplying: boolean; 
  setSearchQuery: (query: string) => void;
  applyForJob: (job: Job) => void;
  withdrawJob: (jobId: string) => void;
  setIsApplying: (isApplying: boolean) => void;
}

interface AuthState {
  email: string;
  profileImage: string;
  setEmail: (email: string) => void;
  setProfileImage: (profileImage: string) => void;
  clearAuth: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  appliedJobs: [],
  searchQuery: '',
  isApplying: false, 
  setSearchQuery: (query) => set({ searchQuery: query }),
  applyForJob: (job) =>
    set((state) => ({
      appliedJobs: [...state.appliedJobs, job],
    })),
  withdrawJob: (jobId) =>
    set((state) => ({
      appliedJobs: state.appliedJobs.filter((job) => job.id !== jobId),
    })),
  setIsApplying: (isApplying) => set({ isApplying }), 
}));

export const useAuthStore = create<AuthState>((set) => ({
  email: localStorage.getItem('email') || '',
  profileImage: localStorage.getItem('profileImage') || '',
  setEmail: (email) => {
    localStorage.setItem('email', email);
    set({ email });
  },
  setProfileImage: (profileImage) => {
    localStorage.setItem('profileImage', profileImage);
    set({ profileImage });
  },
  clearAuth: () => {
    localStorage.removeItem('email');
    localStorage.removeItem('profileImage');
    set({ email: '', profileImage: '' });
  },
}));




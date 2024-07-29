
import {create} from 'zustand';
import { Job } from '../api/job';

interface JobStore {
  appliedJobs: Job[];
  applyForJob: (job: Job) => void;
  withdrawJob: (jobId: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  appliedJobs: [],
  applyForJob: (job) =>
    set((state) => ({
      appliedJobs: [...state.appliedJobs, job],
    })),
  withdrawJob: (jobId) =>
    set((state) => ({
      appliedJobs: state.appliedJobs.filter((job) => job.id !== jobId),
    })),
}));

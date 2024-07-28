
import axios from 'axios';
import { API_BASE_URL } from './index';

export interface Job {
  id: string;
  name: string;
  companyName: string;
  location: string;
  description: string;
  salary: number;
}

export const fetchJobListings = async (): Promise<Job[]> => {
  try {
    const response = await axios.get('https://novel-project-ntj8t.ampt.app/api/jobs',{
    headers:{
    Authorization:"Berarer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZmZkZjQ2LWFhMTQtNGRmMS1hZjBhLThmZjc3N2M2YmVmYi0xNzE4MTA2MDQzOTU1IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzIyMTg5MTU3LCJleHAiOjE3MjIxOTE1NTd9.7dxO7ygiaEv0tE8E0CxPYxSlomEm0OJ7DtTnOooa1Ew"
    },}) ;
    console.log('API Response:KDJSKSDJHKSJDGJKHGSDKJG', response);
    if (response.status !== 200) {
      throw new Error('Failed to fetch job listings');
    }
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching job listings:', error);
    throw new Error('No jobs found or incorrect data format');
  }
};

export const applyForJob = async (jobId: string): Promise<void> => {
  try {
    await API_BASE_URL.post(`/jobs/${jobId}/apply`);
  } catch (error) {
    console.error('Error applying for job:', error);
    throw new Error('Failed to apply for job');
  }
};

export const withdrawApplication = async (jobId: string): Promise<void> => {
  try {
    await API_BASE_URL.post(`/jobs/${jobId}/withdraw`);
  } catch (error) {
    console.error('Error withdrawing application:', error);
    throw new Error('Failed to withdraw application');
  }
};




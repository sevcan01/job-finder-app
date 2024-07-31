import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const baseURL = process.env.REACT_APP_API_BASE_URL;
export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  localStorage.setItem("refreshToken", response.data.refreshToken);
  localStorage.setItem("accessToken", response.data.accessToken);
  const { setEmail } = useAuthStore.getState();
  setEmail(email);

  localStorage.setItem('email', email);

  return response.data;
};

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post('/register', { email, password });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {

      console.error('Registration failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {

      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  }
};

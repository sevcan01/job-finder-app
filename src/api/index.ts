import axios from 'axios';

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZmZkZjQ2LWFhMTQtNGRmMS1hZjBhLThmZjc3N2M2YmVmYi0xNzE4MTA2MDQzOTU1IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzIyMTEwNDE3LCJleHAiOjE3MjIxMTI4MTd9.aKrYdNvHPdKC9YrcbmK4RdI8bTl8U4BY2mYaYGSoguo';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZmZkZjQ2LWFhMTQtNGRmMS1hZjBhLThmZjc3N2M2YmVmYi0xNzE4MTA2MDQzOTU1IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzIyMTEwNDE3LCJleHAiOjE3MjIxMTc2MTd9.Cncv8XQBWBFD33o1vOC0Y9YcDCQAg5Rs1tUt4hCQ1o4';

export const API_BASE_URL = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  },
});

export const refreshTokenRequest = async () => {
  try {
    const response = await axios.post('https://novel-project-ntj8t.ampt.app/api/refresh-token', {
      refreshToken: refreshToken
    });
    const newAccessToken = response.data.accessToken;
    accessToken = newAccessToken;
    API_BASE_URL.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Failed to refresh token');
  }
};

API_BASE_URL.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshTokenRequest();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return API_BASE_URL(originalRequest);
      } catch (refreshError) {
        console.error('Error during token refresh:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

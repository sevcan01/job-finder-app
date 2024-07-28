// import axios from 'axios';

// let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZmZkZjQ2LWFhMTQtNGRmMS1hZjBhLThmZjc3N2M2YmVmYi0xNzE4MTA2MDQzOTU1IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzIyMTg1MzkzLCJleHAiOjE3MjIxODc3OTN9.1Q1UwNrPLP38WA_qWYBuZfWDcZxejeYBNTHT1b2BEHQ';
// let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZmZkZjQ2LWFhMTQtNGRmMS1hZjBhLThmZjc3N2M2YmVmYi0xNzE4MTA2MDQzOTU1IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzIyMTg1MzkzLCJleHAiOjE3MjIxOTI1OTN9.4ssCm0XMlxRf-pCK4c_QyO7etAGSORpLGaIHIOsvnyw';

// export const API_BASE_URL = axios.create({
//   baseURL: 'https://novel-project-ntj8t.ampt.app/api',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`,
//   },
// });

// export const refreshTokenRequest = async () => {
//   try {
//     const response = await axios.post('https://novel-project-ntj8t.ampt.app/api/refresh-token', {
//       refreshToken: refreshToken
//     });
//     const newAccessToken = response.data.accessToken;
//     accessToken = newAccessToken;
//     API_BASE_URL.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//     return newAccessToken;
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     throw new Error('Failed to refresh token');
//   }
// };

// API_BASE_URL.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newAccessToken = await refreshTokenRequest();
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return API_BASE_URL(originalRequest);
//       } catch (refreshError) {
//         console.error('Error during token refresh:', refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );


// src/api/index.ts
import axios from 'axios';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZmZkZjQ2LWFhMTQtNGRmMS1hZjBhLThmZjc3N2M2YmVmYi0xNzE4MTA2MDQzOTU1IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzIyMTg2MzU2LCJleHAiOjE3MjIxODg3NTZ9.NQm6nuyw1o_O5aEj68o5XdJ7Cav3uh-wzwQ-c73tQI4';

export const API_BASE_URL = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  },
});

export const login = async (email: string, password: string) => {
  const response = await API_BASE_URL.post('/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await API_BASE_URL.post('/register', { email, password });
  return response.data;
};

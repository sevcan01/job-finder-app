// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobListingsPage from './pages/JobListingsPage';
import { api } from './api';
import Layout from './components/layout.tsx';


const App: React.FC = () => {
  useEffect(() => {
    api.post("/refresh", { refreshToken: localStorage.getItem("refreshToken") })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch((error) => {
        console.error('Failed to refresh token:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/job-listing" element={<Layout><JobListingsPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;

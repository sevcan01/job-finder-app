import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobListingsPage from './pages/JobListingsPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobListingsPage />} />
    </Routes>
  </Router>
);

export default App;

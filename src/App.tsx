import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobListingsPage from './pages/JobListingsPage';
import { api } from './api';


const App: React.FC = () => {
  useEffect(()=>{

   api.post("/refresh",{refreshToken:localStorage.getItem("refreshToken")})
   .then((res) => {
  localStorage.setItem("accessToken",res.data.accessToken);
})
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job-listing" element={<JobListingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

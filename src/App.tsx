import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobListingsPage from './pages/JobListingsPage';
import { api } from './api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer  autoClose={1000}/>
    </Router>
  );
};

export default App;

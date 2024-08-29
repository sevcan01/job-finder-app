import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListingsPage from "./pages/JobListingsPage";
import { api } from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute bileşenini import edin
import Layout from "./components/layout";

const App: React.FC = () => {
  useEffect(() => {
    api
      .post("/refresh", { refreshToken: localStorage.getItem("refreshToken") })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
      });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/job-listing"
            element={<PrivateRoute element={<JobListingsPage />} />}
          />
        </Routes>
      </Layout>
      <ToastContainer autoClose={1000} />
    </Router>
  );
};

export default App;

// src/App.tsx
import React, { useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';  // Remove BrowserRouter here
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SavingsPage from './pages/Savings';
import MySavingsPage from './pages/MySavings';
import SavingInvestForm from './pages/SavingInvestment';
import Calculator from './pages/Calculator';
import RetirementForm from './pages/Profile';
import Login from './pages/Login';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the token exists in localStorage
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      // If no token, redirect to login page
      navigate('/login');
    } else {
      // If token exists, navigate to the dashboard
      navigate('/home');
    }
  }, [navigate]);

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/my-savings" element={<MySavingsPage />} />
        <Route path="/saving-investment" element={<SavingInvestForm />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/profile" element={<RetirementForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

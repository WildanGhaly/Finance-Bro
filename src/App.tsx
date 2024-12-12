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
  
    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      
      // Only redirect if on login page and token exists
      if (authToken && location.pathname === '/login') {
        navigate('/home');
      }
      // Only redirect to login if no token and not already on login page
      else if (!authToken && location.pathname !== '/login') {
        navigate('/login');
      }
    }, [navigate, location]);
  

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}
      {/* <Navbar /> */}
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

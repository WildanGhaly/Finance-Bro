// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SavingsPage from './pages/Savings';
import MySavingsPage from './pages/MySavings';
import SavingInvestForm from './pages/SavingInvestment';
import Calculator from './pages/Calculator';
import RetirementForm from './pages/Profile';
import Prediction from './pages/Prediction';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/my-savings" element={<MySavingsPage />} />
        <Route path="/saving-investment" element={<SavingInvestForm />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/profile" element={<RetirementForm />} />
        <Route path="/saving-investment" element={<SavingInvestForm />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </Router>
  );
};

export default App;
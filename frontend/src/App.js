import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Benefits from './components/Benefits';
import Testimonial from './components/Testimonial';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import UserProfile from './components/UserProfile';
import './App.css';

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Benefits />
      <Testimonial />
      <CallToAction />
      <Footer />
    </>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  return <UserProfile onBack={handleBack} />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="/exposures" element={<DashboardLayout />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App; 
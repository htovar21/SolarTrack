import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Benefits from './components/Benefits';
import Testimonial from './components/Testimonial';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
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

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="/exposures" element={<DashboardLayout />} />
          <Route path="/perfil" element={<DashboardLayout />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App; 
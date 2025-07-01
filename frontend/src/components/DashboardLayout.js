import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardMain from './DashboardMain';
import ExposureManager from './ExposureManager';
import UserProfile from './UserProfile';
import './DashboardLayout.css';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Determinar qué componente mostrar basado en la ruta actual
  const renderContent = () => {
    if (location.pathname === '/exposures') {
      return <ExposureManager />;
    }
    if (location.pathname === '/perfil') {
      return <UserProfile />;
    }
    // Para cualquier otra ruta (incluyendo /dashboard, /, etc.)
    return <DashboardMain />;
  };

  return (
    <div className="dashboard-layout">
      {/* Overlay para móviles */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay active" 
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Contenido principal */}
      <main className="dashboard-content">
        {/* Header con botón hamburguesa */}
        <header className="dashboard-header">
          <button 
            className="hamburger-btn"
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          <div className="header-title">
            <h1>SolarTrack</h1>
            <p>Tu compañero solar inteligente</p>
          </div>
        </header>

        {/* Contenido dinámico */}
        {renderContent()}
      </main>
    </div>
  );
}

export default DashboardLayout; 
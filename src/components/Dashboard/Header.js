// src/components/Dashboard/Header.js
import React from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰ {/* Puedes usar un icono de hamburguesa aquí */}
      </button>
      <h1>Bienvenido al Dashboard</h1>
    </header>
  );
};

export default Header;

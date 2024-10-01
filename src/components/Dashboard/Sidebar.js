// src/components/Dashboard/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <ul>
        <li><Link to="/dashboard">Inicio</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
        <li><Link to="/settings">Configuraciones</Link></li> 
        <li><Link to="/dashboard/clients">Clientes</Link></li> {/* Agregado aquí */}
      </ul>
    </div>
  );
};

export default Sidebar;

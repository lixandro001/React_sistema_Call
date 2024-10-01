// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // Asegúrate de que esta ruta sea correcta
import './index.css'; // Si tienes un archivo de estilos globales

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

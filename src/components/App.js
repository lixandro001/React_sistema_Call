import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Main from './Dashboard/Main';
import Sidebar from './Dashboard/Sidebar';
import Header from './Dashboard/Header';
import Footer from './Dashboard/Footer';
import './Dashboard/Dashboard.css'; // Estilos para el Dashboard

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard/*" // Asegúrate de que esto tenga el asterisco
            element={
              <div className="d-flex">
                <Sidebar isOpen={isSidebarOpen} />
                <div className="content">
                  <Header toggleSidebar={toggleSidebar} />
                  <Main /> {/* Aquí renderizamos Main que contendrá las subrutas */}
                  <Footer />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

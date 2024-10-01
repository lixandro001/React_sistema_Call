// src/components/Dashboard/Main.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientList from '../Clients/ClientList'; // Asegúrate de que la ruta sea correcta
import ClientForm from '../Clients/ClientForm'; // Para agregar/editar clientes
  
const Main = () => {
    return (
        <main> 
            <Routes>
                <Route path="clients" element={<ClientList />} /> {/* Sin la barra inicial */}
                <Route path="clients/new" element={<ClientForm />} />
                <Route path="clients/edit/:id" element={<ClientForm />} /> 
            </Routes>
        </main>
    );
};

export default Main;

// src/components/Clients/ClientForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams(); // Para editar un cliente
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3008/clients/${id}`)
        .then(response => {
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch(error => console.error('Error fetching client data:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = { name, email };

    if (id) {
      axios.put(`http://localhost:3008/clients/${id}`, clientData)
        .then(() => navigate('/clients'))
        .catch(error => console.error('Error updating client:', error));
    } else {
      axios.post('http://localhost:3008/clients', clientData)
        .then(() => navigate('/clients'))
        .catch(error => console.error('Error creating client:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit">{id ? 'Actualizar Cliente' : 'Crear Cliente'}</button>
    </form>
  );
};

export default ClientForm;

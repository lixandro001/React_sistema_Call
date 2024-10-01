import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './ClientList.css'; 
// import { useNavigate } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false); // Nuevo estado para el modal de nuevo cliente
  const [bodyClient, setbodyClient] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', email: '' }); // Estado para el nuevo cliente
   

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');  
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get('http://localhost:3008/clients', config);
        console.log(response);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');  
        const config = {
          headers: {
            Authorization: token,
          },
        }; 
        await axios.delete(`http://localhost:3008/clients/${id}`, config); 
        setClients(clients.filter(client => client.id !== id));
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleEditClick = (client) => {
    setbodyClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setbodyClient(null);
    setNewClient({ name: '', email: '' }); // Resetear el nuevo cliente al cerrar el modal
    setIsNewClientModalOpen(false); // Cerrar modal de nuevo cliente
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');  
      const config = {
        headers: {
          Authorization: token,
        },
      };
      // Actualiza el cliente en la API
      await axios.put(`http://localhost:3008/clients/${bodyClient.id}`, bodyClient, config);
      // Actualiza la lista de clientes
      setClients(clients.map(client => (client.id === bodyClient.id ? bodyClient : client)));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleNewClientSave = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');  
      const config = {
        headers: {
          Authorization: token,
        },
      };
      // Crea un nuevo cliente en la API
      const response = await axios.post('http://localhost:3008/clients', newClient, config);
      
      setClients([...clients, response.data]); // Agrega el nuevo cliente a la lista
      setClients(clients.map(client => (client.id === bodyClient.id ? bodyClient : client)));
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <div className="client-list">
      <h2>Lista de Clientes</h2>
      <button className="new-client-button" onClick={() => setIsNewClientModalOpen(true)}>Nuevo Cliente</button> {/* Botón para abrir el modal de nuevo cliente */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <button className="action-button edit-button" onClick={() => handleEditClick(client)}>
                  Editar
                </button>
                <button className="action-button delete-button" onClick={() => handleDelete(client.id)}>
                  Eliminar
                </button>
                {/* <button className="action-button detail-button">
                  <Link to={`/clients/detail/${client.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>Ver Detalles</Link>
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      {/* Modal para Editar Cliente */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSave} className="edit-client-form">
              <label>
                <span>Nombre:</span>
                <input 
                  type="text" 
                  value={bodyClient.name} 
                  onChange={(e) => setbodyClient({ ...bodyClient, name: e.target.value })} 
                  required 
                  className="form-input"
                />
              </label>
              <label>
                <span>Email:</span>
                <input 
                  type="email" 
                  value={bodyClient.email} 
                  onChange={(e) => setbodyClient({ ...bodyClient, email: e.target.value })} 
                  required 
                  className="form-input"
                />
              </label> 
              <label>
                <span>Celular:</span>
                <input 
                  type="phone" 
                  value={bodyClient.phone} 
                  onChange={(e) => setbodyClient({ ...bodyClient, phone: e.target.value })} 
                  required 
                  className="form-input"
                />
              </label> 
              <button type="submit" className="submit-button">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Nuevo Cliente */}
      {isNewClientModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={handleNewClientSave} className="edit-client-form">
              <label>
                <span>Nombre:</span>
                <input 
                  type="text" 
                  value={newClient.name} 
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} 
                  required 
                  className="form-input"
                />
              </label>
              <label>
                <span>Email:</span>
                <input 
                  type="email" 
                  value={newClient.email} 
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} 
                  required 
                  className="form-input"
                />
              </label>
              <label>
                <span>Celular:</span>
                <input 
                  type="phone" 
                  value={newClient.phone} 
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} 
                  required 
                  className="form-input"
                />
              </label> 
              <button type="submit" className="submit-button">Agregar Cliente</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;

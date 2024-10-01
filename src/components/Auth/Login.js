import React, { useState } from 'react';
import './Auth.css'; // Importa el CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cambia la URL a tu endpoint de API
            const response = await axios.post('http://localhost:3008/login', { username, password });

            // Asume que el token está en response.data.token
            const token = response.data.token; 
            // Guarda el token en el localStorage
            localStorage.setItem('token', token); 
            // Redirige al dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    return ( 
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

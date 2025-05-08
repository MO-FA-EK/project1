import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        const loginUrl = 'https://my-backend-lmjv.onrender.com/login';

        try {
            const response = await axios.post(loginUrl, {
                identifier: identifier,
                password: password
            });

            console.log('Login successful:', response.data);

            if (response.data.developer && response.data.developer.username) {
                 localStorage.setItem('loggedInUserId', response.data.developer.id);
                 localStorage.setItem('username', response.data.developer.username);
                 localStorage.setItem('category', response.data.developer.category);
                 localStorage.setItem('description', response.data.developer.description);
                 localStorage.setItem('portfio', response.data.developer.portfio);
                 localStorage.setItem('email', response.data.developer.email);
                 localStorage.setItem('password', password);
            }

            navigate('/dashboard');

        } catch (error) {
            setIsError(true);
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else if (error.request) {
                 setMessage('Network Error: Could not reach server. Is it running?');
             } else {
                setMessage('An unexpected error occurred during login.');
            }
             console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Developer Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="log-identifier">Username or Email:</label>
                    <input
                        type="text"
                        id="log-identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="log-password">Password:</label>
                    <input
                        type="password"
                        id="log-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" className="auth-button" disabled={isLoading} style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
            </form>
            {message && isError && (
                 <p className={`status-message error`}>
                     {message}
                 </p>
            )}
        </div>
    );
}

export default Login;
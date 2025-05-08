import React, { useState } from 'react';
import axios from 'axios';

const categoryOptions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'UI/UX Designer',
    'Data Scientist',
    'Mobile Developer',
    'Game Developer'
];

function Register() {
    const [username, setUsername] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [portfio, setPortfio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        const registerUrl = 'http://localhost:3000/register';

        if (!category) {
             setMessage('Please select a category.');
             setIsError(true);
             setIsLoading(false);
             return;
         }


        try {
            const response = await axios.post(registerUrl, {
                username: username,
                category: category,
                description: description,
                portfio: portfio,
                email: email,
                password: password
            });

            setMessage(response.data.message || 'Registration successful!');
            setIsError(false);
            setUsername('');
            setCategory('');
            setDescription('');
            setPortfio('');
            setEmail('');
            setPassword('');

        } catch (error) {
            setIsError(true);
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else if (error.request) {
                setMessage('Network Error: Could not reach server. Is it running?');
            } else {
                setMessage('An unexpected error occurred during registration.');
            }
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register New Developer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reg-username">Username:</label>
                    <input
                        type="text"
                        id="reg-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reg-category">Category:</label>
                    <select
                        id="reg-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        disabled={isLoading}
                    >
                       <option value="" disabled>-- Select a Category --</option>
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="reg-description">Description:</label>
                    <textarea
                        id="reg-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isLoading}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-portfio">Portfolio:</label>
                    <input
                        type="text"
                        id="reg-portfio"
                        value={portfio}
                        onChange={(e) => setPortfio(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-email">Email:</label>
                    <input
                        type="email"
                        id="reg-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-password">Password:</label>
                    <input
                        type="password"
                        id="reg-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" className="auth-button" disabled={isLoading} style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {message && (
                 <p className={`status-message ${isError ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default Register;
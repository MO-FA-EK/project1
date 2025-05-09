import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/profile';
import Orders from './components/Orders';
import './App.css';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

function AppContent() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('username');

    return (
        <div className="App">
            {!isAuthenticated && (<nav className="home-nav">
                <div className="home-logo"><a href='http://localhost:3000/' style={{textDecoration: 'none', color: 'black'}}>EasyJob</a></div>
                <div className="home-nav-actions">
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="try-btn" onClick={() => navigate('/register')}>Register</button>
                </div>
            </nav>)}
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />

                {/* Protected Routes */}
                <Route path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="orders" element={<Orders />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    const isAuthenticated = !!localStorage.getItem('username');

    if (!isAuthenticated) {

        console.log('User not authenticated, redirecting to login from:', location.pathname);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
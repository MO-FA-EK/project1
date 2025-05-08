// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// This component checks if a user is "logged in" based on localStorage
// In a real app, you'd likely check for a valid authentication token (JWT)
// and potentially verify it against a backend or check expiry.
const ProtectedRoute = ({ children }) => {
    const location = useLocation(); // Get current location

    // --- Authentication Check ---
    // Using the presence of 'loggedInUsername' as the indicator for now.
    // Replace this with your actual authentication check logic (e.g., checking for a valid token).
    const isAuthenticated = !!localStorage.getItem('username');
    // The !! converts the value (or null) to a boolean

    if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        // We pass the current location in state so the login page can redirect back after success (optional)
        console.log('User not authenticated, redirecting to login from:', location.pathname);
        return <Navigate to="/login" state={{ from: location }} replace />;
        // 'replace' prevents the login page from being added to history when redirecting back
    }

    // If authenticated, render the child component (e.g., Dashboard)
    return children;
};

export default ProtectedRoute;
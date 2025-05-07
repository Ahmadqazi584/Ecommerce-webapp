import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false }) => {
    const { user } = useSelector((state) => state.auth);

    // More accurate check for logged-in status
    const isLoggedIn = user && Object.keys(user).length > 0;

    if (publicPage) {
        return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

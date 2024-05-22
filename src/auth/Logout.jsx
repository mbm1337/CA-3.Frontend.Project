import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout({ handleLogout }) {
    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return <Navigate to="/" />;
}

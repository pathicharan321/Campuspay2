import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
const PrivateRoute = ({ children }) => {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${config.API_URL}/auth/verify-token`, {
                        headers: {
                           Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    if(response.status === 200){
                        setIsAuthenticated(true);
                    }else{
                        setIsAuthenticated(false);
                    }
                } catch {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            setIsAuthChecked(true);
        };

        verifyToken();
    }, [token]);

    if (!isAuthChecked) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>; 
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
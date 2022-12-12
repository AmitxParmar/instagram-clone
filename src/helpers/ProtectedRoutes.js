import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import * as ROUTES from "../constants/Routes"


const ProtectedRoute = ({ children }) => {
    const { user } = UserAuth();
    if (!user)
        return (
            <Navigate to={ROUTES.LOGIN} />
        )
    return children;
};

export default ProtectedRoute
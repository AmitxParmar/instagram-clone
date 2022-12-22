import { cloneElement } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import * as ROUTES from "../constants/Routes"
import { PropTypes } from 'prop-types'

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to={ROUTES.LOGIN} />
    }
    return children;
};

/* ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
};
 */
export default ProtectedRoute

{/* <Navigate to={ROUTES.LOGIN} />
        )
    return children; */}
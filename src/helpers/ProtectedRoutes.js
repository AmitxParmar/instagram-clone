import { cloneElement } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import * as ROUTES from "../constants/Routes"
import { PropTypes } from 'prop-types'

const ProtectedRoute = ({ user, children, ...rest }) => {
    //  if (!user)
    return (
        console.log('protected route fix')
        /*  <Route
             {...rest}
             render={({ location }) => {
                 if (user) {
                     return cloneElement(children, { user });
                 }
                 if (!user) {
                     return (
                         <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace={true} />
                     );
                 }
                 return null;
             }}
         /> */
    );
};

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
};

export default ProtectedRoute

{/* <Navigate to={ROUTES.LOGIN} />
        )
    return children; */}
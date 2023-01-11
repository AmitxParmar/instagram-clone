import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';

import * as ROUTES from '../constants/Routes';
import { useAuth } from '../hooks/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to={ROUTES.LOGIN} />;
};

/* if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
} */
/* user && <Route {...restOfProps}
    render={(props) => isAuthenticated ? <Component {...props} /> : redirect(ROUTES.LOGIN)}
/>; */
ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
};

export default ProtectedRoute;

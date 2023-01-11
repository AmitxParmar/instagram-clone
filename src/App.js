import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ReactLoader from './components/Loader';
import * as ROUTES from './constants/Routes';
import ProtectedRoute from './helpers/ProtectedRoutes';
import { AuthContextProvider } from './hooks/AuthContext';

//import UserContext from './context/User';

const Login = lazy(() => import('./pages/Login.js'));
const SignUp = lazy(() => import('./pages/SignUp.js'));
const NotFound = lazy(() => import('./pages/NotFound.js'));
const Dashboard = lazy(() => import('./pages/Dashboard.js'));
const Profile = lazy(() => import('./pages/Profile.js'));

const App = () => {

    return (
        <AuthContextProvider>
            <Router>
                <Suspense fallback={<ReactLoader />}>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />
                        <Route path={ROUTES.PROFILE} element={<Profile />} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthContextProvider>

    );
};

export default App;

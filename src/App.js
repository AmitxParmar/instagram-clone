import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/Routes';
import { AuthContextProvider } from "./context/AuthContext"

import ProtectedRoute from './helpers/ProtectedRoutes';

const Login = lazy(() => import('./pages/Login.js'));
const SignUp = lazy(() => import('./pages/SignUp.js'));
const NotFound = lazy(() => import('./pages/NotFound.js'));
const Dashboard = lazy(() => import('./pages/Dashboard.js'));

const App = () => {
    return (
        <AuthContextProvider>
            <Router>
                <Suspense fallback={<p>Loading....</p>}>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path='/' element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />

                        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                    </Routes>
                </Suspense>
            </Router>
        </AuthContextProvider >
    );
}

export default App;

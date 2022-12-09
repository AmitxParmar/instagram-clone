import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { AuthContextProvider } from "./context/AuthContext"
/* import Layout from './components/Layout'; */

const Login = lazy(() => import('./pages/login.js'));
const SignUp = lazy(() => import('./pages/signup.js'));
const NotFound = lazy(() => import('./pages/not-found.js'));

const App = () => {
    return (
        <AuthContextProvider>
            <Router>
                <Suspense fallback={<p>Loading....</p>}>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthContextProvider>
    );
}

export default App;

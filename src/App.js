import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

/* import Layout from './components/Layout'; */

const Login = lazy(() => import('./pages/login.js'));
const SignUp = lazy(() => import('./pages/signup.js'));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<p>Loading....</p>}>
                <Routes>
                    <Route path='/' />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                    <Route path="*" element={<p>Not found</p>} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;

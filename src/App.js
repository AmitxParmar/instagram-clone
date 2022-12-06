import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

/* import Layout from './components/Layout'; */

const Login = lazy(() => import('./pages/login.js'));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<p>Loading....</p>}>
                <Routes>
                    <Route exact path={ROUTES.DASHBOARD} element={<Login />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;

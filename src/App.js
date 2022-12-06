import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import "./styles/main.css";
/* import Layout from './components/Layout'; */

const Login = lazy(() => import('./pages/login'));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<p>Loading....</p>}>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;

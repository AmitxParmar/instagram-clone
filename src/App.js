import { lazy, Suspense } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
/* import Layout from './components/Layout'; */
const Login = lazy(() => import('./pages/Login'));

const App = (props) => {
    return (
        <Router>
            <Suspense fallback={<p>Loading....</p>}>
                <Routes>
                    <Route exact path='/' />
                    <Route path={ROUTES.LOGIN} component={<Login />} />
                </Routes>
            </Suspense>
        </Router>
    )
}


export default App;

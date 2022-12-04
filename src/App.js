import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Layout from './components/Layout';
const Login = lazy(() => import('./pages/login'));

const App = (props) => {
    return (
        <Router>
            <Suspense fallback={<p>Loading....</p>}>
                <Routes>
                    <Route exact path='/' component={<Layout />} />
                    <Route path={ROUTES.LOGIN} component={<Login />} />
                </Routes>
            </Suspense>
        </Router>
    )
}


export default App;

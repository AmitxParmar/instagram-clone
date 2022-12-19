import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/Routes';
import { AuthContextProvider } from "./context/AuthContext";
import ReactLoader from './components/Loader'
import useAuthListener from './hooks/useAuthListener';
import ProtectedRoute from './helpers/ProtectedRoutes';
import UserContext from './context/User';

const Login = lazy(() => import('./pages/Login.js'));
const SignUp = lazy(() => import('./pages/SignUp.js'));
const NotFound = lazy(() => import('./pages/NotFound.js'));
const Dashboard = lazy(() => import('./pages/Dashboard.js'));
//const Profile = lazy(() => import('./pages/Profile.js'));

const App = () => {
    const { user } = useAuthListener();
    return (
        //<AuthContextProvider>
        <UserContext.Provider value={{ user }}>
            <Router>
                <Suspense fallback={<ReactLoader />}>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path='/' element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserContext.Provider>
        //  </AuthContextProvider> 

    );
}

export default App;

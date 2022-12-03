import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
const Login = lazy(()=> import('./pages/login'));

const App = (props) =>{
    return (
        <Router>
            <Suspense fallback={<p>Loading....</p>}>
                <Switch>
                    <Route path='/login' component={Login} />
                </Switch>
            </Suspense>
        </Router>
    )
}


export default App;

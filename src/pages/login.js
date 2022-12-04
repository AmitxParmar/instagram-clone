import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';


const Login = () => {
    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState(null);
    const [password, setPassword] = useState(null);

    const [error, setError] = useState(null);
    const isValid = password === '' || emailAddress === '';

    const handleLogin = () => {

    };

    useEffect(() => {
        document.title = 'Login - Instagram';
    },[]);



    return (
        <div>Login</div>
    )
}

export default Login
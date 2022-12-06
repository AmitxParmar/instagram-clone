import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import FirebaseContext from "../context/firebase";

const Login = () => {
    const { firebase } = useContext(FirebaseContext);
    const navigation = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === "" || email === "";

    const handleLogin = () => { };

    useEffect(() => {
        document.title = "Login - Instagram"
    }, []);

    return (
        <div className="container flex mx">Test - login</div>
    )
};

export default Login;
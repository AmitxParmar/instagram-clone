import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import * as ROUTES from "../constants/Routes";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = UserAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === "" || email === "";

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await login(email, password)
                .then((response) => {
                    navigate(ROUTES.DASHBOARD)
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                })
        } catch (error) {
            const errorCode = error.code;
            setEmail('');
            setPassword('');
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError(`Email address ${email} already in use.`);
                    console.log(`Email address ${email} already in use. ${errorCode}`);
                    break;
                case 'auth/invalid-email':
                    setError(`Email address ${email} is invalid.`);
                    console.log(`Email address ${email} is invalid. ${errorCode}`);
                    break;
                case 'auth/operation-not-allowed':
                    setError(`Error during sign up.`);
                    console.log(`Error during sign up. ${errorCode}`);
                    break;
                case 'auth/weak-password':
                    setError(`Password is not strong enough. Add additional characters including special characters and numbers.`);
                    console.log(`Password is not strong enough. Add additional characters including special characters and numbers.${errorCode}`);
                    break;
                case 'auth/wrong-password':
                    setError(`Wrong Email or Password.`);
                    console.log(`Wrong Email or Password. ${errorCode}`);
                    break;
                default:
                    setError(error.message)
                    console.log(`${error.message} ${errorCode}`);
                    break;
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (error) {
                setError("");
                console.log("error reset")
            }
        }, 5000);
        document.title = "Login - Instagram"
    }, [error]);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>

                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method="POST">

                        <input
                            autoComplete="email"
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                            value={email}
                        />
                        <input
                            autoComplete="user-password"
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Don't have an account?{` `}
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
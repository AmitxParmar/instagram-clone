import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes"
import { auth } from "../lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
/* import { doesUserNameExist } from "../services/firebase"; */

const SignUp = () => {
    const { firebaseApp } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === "" || email === "";

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log("result of signup createUser: " + result)
        } catch (error) {
            setUserName('');
            setFullName('');
            setEmail('');
            setPassword('');
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError(`Email address ${email} already in use.`);
                    console.log(`Email address ${email} already in use.`);
                    break;
                case 'auth/invalid-email':
                    setError(`Email address ${email} is invalid.`);
                    console.log(`Email address ${email} is invalid.`);
                    break;
                case 'auth/operation-not-allowed':
                    setError(`Error during sign up.`);
                    console.log(`Error during sign up.`);
                    break;
                case 'auth/weak-password':
                    setError('Password is not strong enough. Add additional characters including special characters and numbers.');
                    console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                    break;
                default:
                    console.log(error.message);
                    break;
            }
        }
    };

    useEffect(() => {
        document.title = "Sign Up - Instagram"
    }, []);

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

                    <form onSubmit={handleSignUp} method="POST">
                        <input
                            autoComplete="username"
                            aria-label="Enter your Username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUserName(target.value)}
                            value={userName}
                        />
                        <input
                            autoComplete="full-name"
                            aria-label="Enter your Full Name"
                            type="text"
                            placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
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
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
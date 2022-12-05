/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';


export const Login = () => {

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
    }, []);



    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className="flex w-3/5">
                <img src=".**/public/images" alt="iPhone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <h1 className="flex justify-center w-full">
                    <img src="/images/logo.png" alt="Instagram" className="mt2 w-6/12 mb-4 " />
                    no idea!
                </h1>

                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                <form method='POST' onSubmit={handleLogin}>
                    <input
                        type="text"
                        aria-label='Enter your email address'
                        placeholder="Email address"
                        className='text-sm text-grey-base w-full mr-5 py-6 px-4 h-2' />


                </form>
            </div>
        </div>
    );
}

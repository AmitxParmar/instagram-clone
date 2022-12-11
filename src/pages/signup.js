import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import * as ROUTES from "../constants/Routes"
import { auth, db, collection, createUserWithEmailAndPassword, updateProfile, addDoc } from "../lib/FirebaseConfig"
import { doesUserNameExist } from "../services/Firebase";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
    //const { firebaseApp } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === "" || email === "";

    const { createUser } = UserAuth();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const userExists = await doesUserNameExist(userName);

        console.log("userExist? " + Boolean(!userExists));
        if (!userExists) { // Run the function if the name exists in database
            try {
                await createUser(email, password)
                    .then(async (response) => {
                        sessionStorage.setItem('Auth-Token', response._tokenResponse.refreshToken)
                        console.log("Token Saved! " + response._tokenResponse.refreshToken)
                        await updateProfile(response.user, {
                            displayName: userName,
                        })
                        console.log("updateProfileDone!")
                        await addDoc(collection(db, 'users'), {
                            userId: response.user.uid,
                            displayName: userName.toLowerCase(),
                            fullName: fullName.toLowerCase(),
                            email: email,
                            following: [],
                            dateCreated: Date.now()
                        })
                        console.log("navigating to dashboard.... ")
                        navigate(ROUTES.DASHBOARD)
                    })
                    .then(async (data) => {
                        alert("data updated!")
                        console.log("data added to database");
                        console.log("Logged in");
                    })
            }
            catch (error) {
                const errorCode = error.code;
                setUserName('');
                setFullName('');
                setEmail('');
                setPassword('');
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setError(`Email address ${email} already in use. ${errorCode}`);
                        console.log(`Email address ${email} already in use. ${errorCode}`);
                        break;
                    case 'auth/invalid-email':
                        setError(`Email address ${email} is invalid. ${errorCode}`);
                        console.log(`Email address ${email} is invalid. ${errorCode}`);
                        break;
                    case 'auth/operation-not-allowed':
                        setError(`Error during sign up. ${errorCode}`);
                        console.log(`Error during sign up. ${errorCode}`);
                        break;
                    case 'auth/weak-password':
                        setError(`Password is not strong enough. Add additional characters including special characters and numbers. ${errorCode}`);
                        console.log(`Password is not strong enough. Add additional characters including special characters and numbers.${errorCode}`);
                        break;
                    default:
                        console.log(`${error.message} ${errorCode}`);
                        break;
                }
            }
        } else {
            setError("user name is already taken")
            console.log("else block");
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
                            autoComplete="on"
                            aria-label="Enter your Username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUserName(target.value)}
                            name="userName"
                            value={userName}
                        />
                        <input
                            name="fullName"
                            autoComplete="on"
                            aria-label="Enter your Full Name"
                            type="text"
                            placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            name="email"
                            autoComplete="on"
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                            value={email}
                        />
                        <input
                            name="password"
                            autoComplete="on"
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



/*  
======================================= The Code Didn't Work ==============================================

.then(async (userCredentials) => {
                       const { user } = await createUserWithEmailAndPassword(auth, email, password)
                           .then(async (userCredential) => {
                               
                           })
                           .then((userCredential) => {
                               alert(`userCredentials: ${userCredential.user}`)
                           })
                }) */
/* console.log(`User ${JSON.stringify(user.displayName)} created first then`)
await updateProfile(user, {
    displayName: userName,
}, user.uid)
console.log("User profile updated")

await addDoc(collection(db, 'users'), {
    userId: user.uid,
    displayName: userName.toLowerCase(),
    fullName: fullName.toLowerCase,
    email: email.toLowerCase,
    following: [],
    dateCreated: Date.now()
}, user.uid)
console.log("navigating to dashboard.... ")
navigate(ROUTES.DASHBOARD)
}*/ 
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../constants/Paths';
import * as ROUTES from '../constants/Routes';
import { useAuth } from '../hooks/AuthContext';
import { db, doc, serverTimestamp, setDoc } from '../lib/FirebaseConfig';
import { doesUserNameExist } from '../services/Firebase';

const SignUp = () => {
    //const { firebaseApp } = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /* image handling test */
    const [selectedImage, setSelectedImage] = useState('');

    /* image handling test */

    const [error, setError] = useState('');
    const isInvalid = password === "" || email === "";

    const { createUser, setDisplayName } = useAuth();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const userExists = await doesUserNameExist(userName);


        if (!userExists) { // Run the function if the name  doesn't exists in database
            try {
                await createUser(email, password)
                    .then(async (response) => {
                        try {
                            const { user } = response;
                            sessionStorage.setItem('Auth_Token_SignUP', response._tokenResponse.refreshToken);
                            console.log("Token Saved! " + response._tokenResponse.refreshToken);
                            await setDisplayName(userName);
                            console.log("updateDisplayNameDone!");
                            setDoc(doc(db, 'users', user.uid), {
                                userId: user.uid,
                                userName: userName.toLowerCase(),
                                fullName: fullName.toLowerCase(),
                                email: email,
                                followers: [],
                                following: [],
                                dateCreated: Date.now(),
                                timestamp: serverTimestamp(),
                                profilePic: selectedImage !== null ? selectedImage : DEFAULT_IMAGE_PATH
                            })
                                .then((data) => {
                                    navigate(ROUTES.DASHBOARD);
                                });
                        } catch (e) {
                            console.log(e.message + e.code);
                        }
                    });
            } catch (error) {
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
            setError("Username is Already Taken");
        }
    };

    useEffect(() => {
        const e = setTimeout(() => {
            if (error) {
                setError("");
                console.log("Error reset");
            }
        }, 8000);
        clearTimeout(e);
        document.title = "Sign Up - Instagram";
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
                        <label for="empty-for-now" className='container border-gray-primary text-sm bg-white'>
                            Upload Profile Pic
                        </label>
                        <input
                            className='hidden'
                            type="file"
                            id='empty-for-now'
                            name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
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
};

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
    fullName: fullName.toLowerCase, // There was a parentheses mistake lol
    email: email.toLowerCase,
    following: [],
    dateCreated: Date.now()
}, user.uid)
console.log("navigating to dashboard.... ")
navigate(ROUTES.DASHBOARD)
}*/ 
import { createContext, useEffect, useContext, useState } from "react";
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "../lib/FirebaseConfig"
import UserContext from './User'
//const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    useContext(UserContext);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const setDisplayName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        }).catch((error) => {
            console.log(error.message);
        });
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                localStorage.setItem('authUser', JSON.stringify(currentUser));
                console.log("LocalstorageSAve! currentUserData return by onAuthChanged " + JSON.stringify(currentUser));
                setUser(currentUser);
                setIsAuthenticated(true);
                console.log(`set user success` + JSON.stringify(currentUser))
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
                console.log('user is null means not authenticated' + JSON.stringify(currentUser))
            }
        })
        return () => unsubscribe();
    }, [])
    return (
        <UserContext.Provider value={{ isAuthenticated, createUser, user, setUser, logout, login, setDisplayName }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext)
}

import { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/Firebase"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/FirebaseConfig";

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { app } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
            }
            else {
                // we don't have an authUser, therefore clear the localStorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
        return () => listener();
    }, [app])
    return { user };
}
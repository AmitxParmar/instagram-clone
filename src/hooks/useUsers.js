import { useState, useEffect, useContext } from "react";
import { AuthContext, UserAuth } from "../context/AuthContext";
import { getUserByUserId } from "../../../instagram/src/services/firebase";

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState({});
    const { user } = UserAuth();

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            const [user] = await getUserByUserId(userId);
            setActiveUser(user || {});
        }

        if (user?.uid) {
            getUserByUserId();
        }
    }, [userId]);

    return { user: activeUser, setActiveUser };

}
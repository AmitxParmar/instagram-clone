import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { getUserByUserId } from "../services/Firebase";

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState({});
    const { user } = UserAuth();

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            const [user] = await getUserByUserId(userId);
            setActiveUser(user || {});
        }

        if (userId) {
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { user: activeUser, setActiveUser };

}
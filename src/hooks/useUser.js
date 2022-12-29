import { useState, useEffect, memo, useMemo, useCallback } from "react";
import { getUserByUserId } from "../services/Firebase";

function useUser(userId) {
    const [activeUser, setActiveUser] = useState({});
    useEffect(() => {
        function getUserObjByUserId(userId) {
            /* const [userIDData] = await */
            getUserByUserId(userId)

                .then((data) => {
                    localStorage.setItem('userFirestoreData', JSON.stringify(data));
                    setActiveUser(data || {});
                    console.log('userIDData ======== ' + data);
                    console.log("active user check" + JSON.stringify(activeUser))
                })
        }

        if (userId) {
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { userData: activeUser, setActiveUser };
}
export default useUser


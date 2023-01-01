import { useEffect, useState } from 'react';

import { getUserByUserId } from '../services/Firebase';

function useUser(userId) {
    const [activeUser, setActiveUser] = useState(JSON.parse(localStorage.getItem('userFirestoreData')));

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            /* const [userIDData] = await */
            await getUserByUserId(userId)
                .then((data) => {
                    localStorage.setItem('userFirestoreData', JSON.stringify(data));
                    setActiveUser(data || {});
                });
        }

        if (userId) {
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { userData: activeUser, setActiveUser };
}
export default useUser


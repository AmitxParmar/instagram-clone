import { useEffect, useState } from 'react';

import { getUserByUserId } from '../services/Firebase';

function useUser(userId = 0) {
    const [activeUser, setActiveUser] = useState(JSON.parse(localStorage.getItem('userFirestoreData')));
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            await getUserByUserId(userId)
                .then((data) => {
                    localStorage.setItem('userFirestoreData', JSON.stringify(data));
                    setActiveUser(data || {});
                });
            setDataLoading(false)
        }

        if (userId) {
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { userData: activeUser, setActiveUser, dataLoading };
}
export default useUser


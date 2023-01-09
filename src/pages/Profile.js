import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header';
import UserProfile from '../components/profile';
import * as ROUTES from '../constants/Routes';
import { getUserByUserName } from '../services/Firebase';

const Profile = () => {
    const { userName } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function checkUserExists() {
            /*  const [user] = await  */
            await getUserByUserName(userName)
                .then((user) => {
                    console.log("🚀 ~ file: Profile.js:17 ~ getUserByUserName ~ user", user);
                    if (user?.userId) {
                        setUser(user);
                    } else {
                        navigate(ROUTES.NOT_FOUND);
                    }
                });
        }
        checkUserExists();
    }, [userName, navigate]);

    return user ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : (<>Loading</>);
};

export default Profile;

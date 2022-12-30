/* import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserByUserName } from '../services/Firebase'
import * as ROUTES from '../constants/Routes'
import Header from '../components/Header'
import UserProfile from '../components/profile';

const Profile = () => {
    const { userName } = useParams();
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUserName(userName);
            if (user?.userId) {
                setUser(user);
            } else {
                navigate(ROUTES.NOT_FOUND)
            }
        }
        checkUserExists();
    }, [userName, navigate]);

    return user.userName ? (
        <div className='bg-gray-background'>
            <Header />
            <div className='mx-auto max-w-screen-lg'>
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;
}

export default Profile */
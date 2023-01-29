import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import Stories from '../components/story/Stories';
import Timeline from '../components/Timeline';
import FirestoreContext from '../context/LoggedInUser';
import { useAuth } from '../hooks/AuthContext';
import useUser from '../hooks/useUser';
import SidebarDesktop from '../components/aside/SidebarDesktop';
const Dashboard = () => {

    const { user } = useAuth();
    console.log("🚀 ~ file: Dashboard.js:14 ~ Dashboard ~ user getting data from auth but not firestore", user);

    const { userData, setActiveUser } = useUser(user.uid);
    console.log("🚀 ~ file: Dashboard.js:16 ~ Dashboard ~ userData", userData);

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return userData && (
        <FirestoreContext.Provider value={{ userData, setActiveUser }}>
            <SidebarDesktop userName={userData?.userName} profilePic={userData?.profilePic} />
            <div className="container float-right h-full bg-black-faded">
                <div className='float-right grid grid-cols-2 gap-5 pl-10 max-w-screen-lg'>
                    <div className='max-w-fit'>
                        <Stories />
                        <Timeline />
                    </div>
                    <Sidebar />
                </div>
            </div>
        </FirestoreContext.Provider >
    );
};

Dashboard.propTypes = {
    userData: PropTypes.object,
};

export default Dashboard;

import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import Story from '../components/story';
import Timeline from '../components/Timeline';
import FirestoreContext from '../context/LoggedInUser';
import { useAuth } from '../hooks/AuthContext';
import useUser from '../hooks/useUser';

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
            <Header />
            <div className="container bg-black-hard">
                <div className='mx-auto float-right grid justify-between  grid-cols-2 gap-5 pl-10 max-w-screen-lg'>
                    <div className='container max-w-fit'>
                        <Story />
                        <Timeline />
                    </div>
                    <Sidebar />
                </div>
                {/*  <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg"> */}

                {/*  </div> */}
            </div>
        </FirestoreContext.Provider >
    );
};

Dashboard.propTypes = {
    userData: PropTypes.object,
};

export default Dashboard;

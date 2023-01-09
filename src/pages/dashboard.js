import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/Timeline';
import FirestoreContext from '../context/LoggedInUser';
import { useAuth } from '../hooks/AuthContext';
import useUser from '../hooks/useUser';

const Dashboard = () => {
    const { user } = useAuth();
    // console.log(userData);
    const { userData, setActiveUser } = useUser(user.uid);
    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <FirestoreContext.Provider value={{ userData, setActiveUser }}>
            <div className="bg-gray-background">

                {userData ? (<>
                    <Header />

                    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                        <Timeline />
                        <Sidebar />
                    </div></>
                ) : (
                    <div>Loading.....................</div>
                )}

            </div>
        </FirestoreContext.Provider>
    ); /* : (
        <div>
            Loading.........
        </div>
    ); */

};

Dashboard.propTypes = {
    userData: PropTypes.object,
};

export default Dashboard;

import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/Timeline';
import LoggedInUserContext from '../context/LoggedInUser';
import { useAuth } from '../hooks/AuthContext';
import useUser from '../hooks/useUser';

const Dashboard = () => {
    const { user } = useAuth();
    const { userData, setActiveUser } = useUser(user.uid);
    // console.log(userData);

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <LoggedInUserContext.Provider value={{ userData, setActiveUser }}>
            <div className="bg-gray-background">
                <Header />
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
};

Dashboard.propTypes = {
    userData: PropTypes.object,
};

export default Dashboard;

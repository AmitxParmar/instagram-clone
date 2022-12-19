import { useEffect } from "react";
import PropTypes from 'prop-types'
import Header from "../components/Header";
/* import Timeline from "../components/Timeline";
import useUser from '../hooks/useUser'
import Sidebar from '../components/sidebar/index' */
import LoggedInUserContext from "../context/LoggedInUser";


const Dashboard = ({ user: loggedInUser }) => {
    const { user, setActiveUser } = useUser(user.uid);

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
            <div className="bg-gray-background">
                <Header />
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    {/*  <Timeline />
                    <Sidebar /> */}
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
}
Dashboard.propTypes = {
    user: PropTypes.object.isRequired
}
export default Dashboard


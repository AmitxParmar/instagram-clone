import { useEffect } from "react";
import PropTypes from 'prop-types'
import Header from "../components/Header";
//import { collection, db, doc, getDoc, getDocs, onSnapshot, where, } from "../lib/FirebaseConfig";
//import Timeline from "../components/Timeline";
import useUser from '../hooks/useUser'
import Sidebar from '../components/sidebar/index'
import LoggedInUserContext from "../context/LoggedInUser";
import { useAuth } from "../hooks/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
    const { userData, setActiveUser  } = useUser(user.uid);
    // console.log(userData);



    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <LoggedInUserContext.Provider value={{  userData , setActiveUser  }}>
            <div className="bg-gray-background">
                <Header />
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    {/* <Timeline /> */}
                    <Sidebar />
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
}


Dashboard.propTypes = {
    userData: PropTypes.object.isRequired
}

export default Dashboard

import { useEffect, useContext } from "react";
import PropTypes from 'prop-types'
import Header from "../components/Header";
import { collection, db, doc, getDocs } from "../lib/FirebaseConfig";
import Timeline from "../components/Timeline";
//import useUser from '../hooks/useUser'
import Sidebar from '../components/sidebar/index'
import LoggedInUserContext from "../context/LoggedInUser";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    //const { userDB, setActiveUser } = useUser(loggedInUser.uid);
    // console.log(userDB);

    const { user } = useAuth();

    /* console.log("hahahahahahah test" + user.uid); */
    useEffect(() => {
        document.title = "Dashboard";
    }, []);
    console.log("user entered in dashboard  " + user.uid)
    return (
        <LoggedInUserContext.Provider value={{ user/* userDB, setActiveUser */ }}>

            <div className="bg-gray-background">
                <Header />
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
}


/* Dashboard.propTypes = {
    user: PropTypes.object.isRequired
} */

const customHook = (initialValue) => {
    let customName = initialValue;
    let queue = [2, 34, 4];
    const customFunction = (value) => {
        const lastvalue = queue.pop();
    }
    return [customFunction, customName]
}

const [customFunction, customName] = customHook();

export default Dashboard

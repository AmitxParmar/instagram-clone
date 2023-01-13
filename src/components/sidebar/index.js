import { useContext } from 'react';

import FirestoreContext from '../../context/LoggedInUser';
import Footer from './Footer';
import Suggestions from './Suggestions';
import User from './User';

export default function Sidebar() {

    const { userData: { docId = '', fullName, userName, userId, following, profilePic } = {} } = useContext(FirestoreContext);
    //get user from firestore not auth
    console.log("🚀 ~ file: index.js:10 ~ Sidebar ~ fullName", fullName);

    return (
        <div className="p-4 capitalize sm:translate-x-0 relative sticky bg-white"> // TODO: Remove bg-white later doesnt suit the theme
            <User userName={userName} fullName={fullName} profilePic={profilePic} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
            <Footer />
        </div>
    );
}
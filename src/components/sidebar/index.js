import { useContext } from 'react';

import FirestoreContext from '../../context/LoggedInUser';
import Footer from './Footer';
import Suggestions from './Suggestions';
import User from './User';

export default function Sidebar() {

    const { userData: { docId = '', fullName, userName, userId, following, profilePic } = {} } = useContext(FirestoreContext);

    //get user from firestore not auth

    return (
        <div className="p-4 container capitalize border border-gray-primary relative bg-white">
            <User userName={userName} fullName={fullName} profilePic={profilePic} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
            <Footer />
        </div>
    );
}
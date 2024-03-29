import { useContext } from 'react';

import FirestoreContext from '../../context/LoggedInUser';
import Footer from './Footer';
import Suggestions from './Suggestions';
import User from './User';

export default function Sidebar() {

    const { userData: { docId = '', fullName, userName, userId, following, profilePic } = {} } = useContext(FirestoreContext);

    //get user from firestore not auth

    return userName && (
        <div className="container w-fit px-11 relative row-span-2  h-fit text-white py-4 capitalize z-50 bg-black-hard">
            <User userName={userName} fullName={fullName} profilePic={profilePic} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
            <Footer />
        </div>
    );
}
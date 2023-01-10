import { useContext } from 'react';

import FirestoreContext from '../../context/LoggedInUser';
import Suggestions from './Suggestions';
import User from './User';

export default function Sidebar() {

    const capitalize = (mySentence) => mySentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    const { userData: { docId = '', fullName, userName, userId, following, profilePic } = {} } = useContext(FirestoreContext);
    //get user from firestore not auth
    console.log("🚀 ~ file: index.js:10 ~ Sidebar ~ fullName", fullName);

    return (
        <div className="p-4">
            <User userName={userName} fullName={fullName} profilePic={profilePic} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
    );
}
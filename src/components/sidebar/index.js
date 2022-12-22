import { useContext } from 'react';
import User from './User';
import Suggestions from './Suggestions';
import LoggedInUserContext from '../../context/LoggedInUser';
import { useAuth } from '../../context/AuthContext';


export default function Sidebar() {
    const { user: { docId = '', fullName, userName, userId, following } = {} } = useAuth();

    return (
        <div className="p-4">
            <User userName={userName} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
    );
}
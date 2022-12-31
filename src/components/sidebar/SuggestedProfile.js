import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import LoggedInUserContext from '../../context/LoggedInUser';
import { getUserByUserId, updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/Firebase';

export default function SuggestedProfile({
    profileDocId,
    userName,
    profileId,
    userId,
    loggedInUserDocId
}) {
    const [followed, setFollowed] = useState(false);
    const { setActiveUser } = useContext(LoggedInUserContext);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);
        /*  const [user] = await */
        getUserByUserId(userId).then((update) => {
            setActiveUser(update);
        }
        );
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={`/images/avatars/${userName}.jpg`}
                    alt=""
                    onError={(e) => {
                        e.target.src = `/images/avatars/default.png`;
                    }}
                />
                <Link to={`/p/${userName}`}>
                    <p className="font-bold text-sm">{userName}</p>
                </Link>
            </div>
            <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ) : null;
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
};

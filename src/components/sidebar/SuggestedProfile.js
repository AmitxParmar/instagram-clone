import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../../constants/Paths';
import FirestoreContext from '../../context/LoggedInUser';
import { getUserByUserId, updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/Firebase';

export default function SuggestedProfile({
    profileDocId,
    fullName,
    profilePic,
    userName,
    profileId,
    userId,
    loggedInUserDocId
}) {
    const [followed, setFollowed] = useState(false);
    const { setActiveUser } = useContext(FirestoreContext);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);

        await getUserByUserId(userId)
            .then((update) => {
                setActiveUser(update);
            }
            );
    }
    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 h-8 flex mr-3"
                    src={profilePic}
                    alt="suggested profile"
                    onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                    }}
                />
                <Link to={`/p/${userName}`}>
                    <p className="font-bold text-sm">{fullName}</p>
                </Link>
            </div>
            <button
                aria-label='follow'
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

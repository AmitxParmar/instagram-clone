/* import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Photos from './Photos';
import { getUserPhotosByUserId } from '../../services/Firebase';

export default function Profile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUserId(user.userId);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }
        getProfileInfoAndPhotos();
    }, [user.userName, user]);

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        userName: PropTypes.string
    })
};
 */
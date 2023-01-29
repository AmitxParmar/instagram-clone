import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';

import { getUserPhotosByUserId } from '../../services/Firebase';
import Header from './Header';
import Photos from './Photos';

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
        <div className='bg-black-light h-screen w-0'>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </div>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        email: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        userName: PropTypes.string,
        timeStamp: PropTypes.string,
    })
};

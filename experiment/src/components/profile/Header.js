import 'react-loading-skeleton/dist/skeleton.css';

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { DEFAULT_IMAGE_PATH } from '../../constants/Paths';
import { useAuth } from '../../hooks/AuthContext';
import useUser from '../../hooks/useUser';
import { db, doc, updateDoc } from '../../lib/FirebaseConfig';
import { isUserFollowingProfile, toggleFollow } from '../../services/Firebase';

/* eslint-disable jsx-a11y/img-redundant-alt */

export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        followers,
        following,
        profilePic,
        instaBio,
        userName: profileUserName
    }
}) {
    // currently logged in user context 
    const { user: loggedInUser } = useAuth();
    const { userData } = useUser(loggedInUser?.uid);
    console.log("🚀 ~ file: Header.js:32 ~ loggedInUser", loggedInUser.displayName)

    /* ================ profilePic =============== */
    const [selectedImage, setSelectedImage] = useState('');
    const handleUpload = (e) => {

    }
    /* ============================= Bio Data Update Logic =============================== */
    const bioRef = useRef();

    const [bio, setBio] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    bioRef.value = instaBio;

    const handleBioSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const value = e.target.value[0];
        const docRef = doc(db, "users", loggedInUser.uid);
        updateDoc(docRef, {
            instaBio: value
        });
        setIsEditing(false);
    };

    /* ================================================================ */


    const [isFollowingProfile, setIsFollowingProfile] = useState(null);


    const activeBtnFollow = userData?.userName && userData?.userName !== profileUserName;
    /* ====================================== __Followers Logic__ ======================================= */

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        });
        await toggleFollow(isFollowingProfile, userData.docId, profileDocId, profileUserId, userData.userId);
    };

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            await isUserFollowingProfile(userData.userName, profileUserId)
                .then((isFollowing) => setIsFollowingProfile(!!isFollowing));
        };
        if (userData?.userName && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [userData.userName, profileUserId]);


    /* <=========================||<<[Header]>>||===========================> */
    /* <=========================||<<[Header]>>||===========================> */
    /* <=========================||<<[Header]>>||===========================> */

    return (
        <div className=" grid grid-cols-3 gap-4 justify-between max-w-screen-lg">
            <div className="container flex justify-center items-center">
                {profileUserName ? (!activeBtnFollow ? (
                    <form id='profile-picture' method='POST'>
                        <label for='profile-pic'>
                            <img
                                className="rounded-full h-40 w-40 flex hover:blur-sm cursor-pointer"
                                alt={`${fullName} profile picture`}
                                src={profilePic}
                                onError={(e) => {
                                    e.target.src = DEFAULT_IMAGE_PATH;
                                }}
                            />
                            <input type="file" name='profilePic' id="profile-pic" className='hidden' />
                        </label>
                    </form>
                ) : (
                    <img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${fullName} profile picture`}
                        src={profilePic}
                        onError={(e) => {
                            e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                    />)
                ) : (
                    <Skeleton circle height={150} width={150} count={1} />)}
            </div>
            <div className="flex items-center justify-center flex-col">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUserName}</p>
                    {activeBtnFollow && isFollowingProfile === undefined ? (
                        <Skeleton count={1} width={80} height={32} />
                    ) : (
                        activeBtnFollow && (
                            <button
                                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                type="button"
                                onClick={handleToggleFollow}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleToggleFollow();
                                    }
                                }}
                            >
                                {isFollowingProfile ? 'Unfollow' : 'Follow'}
                            </button>
                        )
                    )}
                </div>
                <div className="container text-sm flex mt-4">
                    {!followers || !following ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">
                                    {photosCount}
                                </span> photos
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{followerCount}</span>
                                {` `}
                                {followerCount === 1 ? `follower` : `followers`}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{following?.length}</span> following
                            </p>
                        </>
                    )}
                </div>

                <div className="container font-serif  text-gray-base mt-4">
                    <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
                </div>

                {/* |========|| [Bio Edit Function] ||=======| */}

                {isEditing && !activeBtnFollow ? (
                    <form onSubmit={handleBioSubmit} method='POST' className='container flex flex-row p-2 relative' >
                        <input
                            aria-label="Update Your Bio..."
                            autoComplete="off"
                            className="text-sm border-none focus:outline-none w-full"
                            type="text"
                            name="edit-bio"
                            placeholder="Update Your Bio..."
                            onChange={({ target }) => setBio(target.value)}
                            ref={bioRef}
                        />
                        <button onClick={handleBioSubmit} type='submit' className={`text-sm font-bold text-blue-medium ${!bio && 'opacity-25'}`} > Update Bio </button>
                    </form>
                ) : (
                    <div className='container'>
                        <p className='font-bold font-mono text-xs '>{instaBio}</p>
                        {!activeBtnFollow && (<p onClick={() => setIsEditing(true)} className='text-xs cursor-pointer uppercase text-gray-base'>
                            edit bio
                        </p>)}
                    </div>)}
            </div>
        </div>
    );
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        userName: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
    }).isRequired
};

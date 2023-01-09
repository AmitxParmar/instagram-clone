import 'react-loading-skeleton/dist/skeleton.css';

import { useContext } from 'react';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import FirestoreContext from '../context/LoggedInUser';
import usePhotos from '../hooks/usePhotos';
import Post from './post';

const Timeline = () => {
    const { userData: { following } = {}, userData } = useContext(FirestoreContext);
    console.log("🚀 ~ file: Timeline.js:15 ~ Timeline ~ userData: {Following}", following);

    const { photos } = usePhotos(userData);
    console.log("🚀 ~ file: Timeline.js:18 ~ Timeline ~ photos", photos);

    return (
        <div className='container col-span-2'>
            {following === undefined || null ? (
                <Skeleton count={2} width={640} height={500}
                    className='mb-5' />
            ) : following.length === 0 ? (
                <p className='flex justify-center font-bold'>Follow other people to see Photos</p>
            ) : photos ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) : null}
        </div>
    );
};

export default Timeline

/* const Timeline = () => {
    return (
        <div>Timeline</div>
    );
};

export default Timeline; */
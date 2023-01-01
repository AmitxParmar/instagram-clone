import { useEffect, useState } from 'react';

import { getPhotos } from '../services/Firebase';

export default function usePhotos(user) {
    const [photos, setPhotos] = useState(null);

    useEffect(
        () => {
            async function getTimelinePhotos() {
                //does the user actually follow people?
                if (user?.following?.length > 0) {
                    const followedUserPhotos = await getPhotos(user.userId, user.following);
                    console.log("🚀 ~ file: usePhotos.js:14 ~ getTimelinePhotos ~ followedUserPhotos", followedUserPhotos);
                    //re-arrange array to be newest photos first by dataCreated
                    followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                    setPhotos(followedUserPhotos);
                }
            }
            getTimelinePhotos();
        }, [user?.userId, user?.following]);
    return { photos };
}

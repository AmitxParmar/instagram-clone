/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getSuggestedProfiles } from '../../services/Firebase';
import SuggestedProfile from './SuggestedProfile';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            await getSuggestedProfiles(userId, following)
                .then(response => {
                    return setProfiles(response);
                });
        }

        if (userId) suggestedProfiles();
    }, [following, userId]);

    // hint: use the firebase service (call using userId)
    // getSuggestedProfiles
    // call the async function ^^^^ within useEffect
    // store it in state
    // go ahead and render (wait on the profiles as in 'skeleton')

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => (
                    <SuggestedProfile
                        key={profile.docId}
                        profileDocId={profile.docId}
                        fullName={profile.fullName}
                        userName={profile.userName}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                ))}
            </div>
        </div>
    ) : null;
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};

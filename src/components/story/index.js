import React, { useState } from 'react';

import StoryOpen from './StoryOpen';
import UserStory from './UserStory';

export default function Story() {

    const arr = new Array(30).fill(30);

    const [showStory, setShowStory] = useState(false);

    return (
        <div className='col-span-6 border border-gray-primary  bg-white container my-4 bg-clip-border overflow-auto mx-6'>
            <StoryOpen showStory={showStory} exitStory={setShowStory} />
            <div
                className='scrollbar-hide w3xl flex overflow-x-auto py-4'>
                {arr.map((_, index) => {
                    return <UserStory key={index} show={setShowStory} />;
                })
                }
            </div>
        </div>
    );
}
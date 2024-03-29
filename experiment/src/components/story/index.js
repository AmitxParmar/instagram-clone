import React, { useState } from 'react';

import StoryOpen from './StoryOpen';
import UserStory from './UserStory';

export default function Story__() {

    const arr = new Array(30).fill(30);

    const [showStory, setShowStory] = useState(false);

    return (
        <div className='bg-black-hard container bg-clip-border overflow-auto '>
            <StoryOpen showStory={showStory} exitStory={setShowStory} />
            <div
                className='scrollbar-hide flex overflow-x-auto py-4'>
                {arr.map((_, index) => {
                    return <UserStory key={index} show={setShowStory} />;
                })
                }
            </div>
        </div>
    );
}
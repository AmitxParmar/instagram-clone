import React, { useState } from 'react';

import StoryOpen from './StoryOpen';
import style from './style.css';
import UserStory from './UserStory';

export default function Story() {

    const arr = new Array(10).fill(10);

    const [showStory, setShowStory] = useState(false);

    return (
        <div className='border-gray-base '>
            <StoryOpen showStory={showStory} exitStory={setShowStory} />
            <div id='stories'
                className='w3xl flex overflow-x-auto pb-8 mt-3'
                style={style.css}
            >
                {arr.map(index => {
                    return <UserStory key={index} show={setShowStory} />;
                })
                }
            </div>
        </div>
    );
}
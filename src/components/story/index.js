import React, { useState } from 'react';

import StoryOpen from './StoryOpen';
import style from './style.css';
import UserStory from './UserStory';

export default function Story() {

    const arr = new Array(30).fill(30);

    const [showStory, setShowStory] = useState(false);

    return (
        <div className='col-span-6 border border-gray-primary  bg-white container my-4 overflow-auto mx-6'>
            <StoryOpen showStory={showStory} exitStory={setShowStory} />
            <div id='stories'
                className='w3xl flex overflow-x-auto py-4'
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
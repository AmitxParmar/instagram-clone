import './style.css';

import React from 'react';

const StoryOpen = ({ showStory, exitStory }) => {
    return (
        <div>
            {showStory ? (
                <div className="story_open">
                    <div className="info__top">
                        <p>username</p>
                        <div className="w-6">
                            <img
                                src="../instagramIcon/close.png"
                                alt="story"
                                onClick={() => exitStory(false)}
                            />
                        </div>
                    </div>
                    <img
                        src={`https://source.unsplash.com/collection/1346951/800x800?sig=${Math.random()}`}
                        alt=""
                    />
                    <div className="absolute bottom-0 text-white border rounded-full p-3 w-full m-3">
                        kirim pesan{" "}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default StoryOpen;

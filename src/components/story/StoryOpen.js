
import React from 'react';

const StoryOpen = ({ showStory, exitStory }) => {
    return (
        <div>
            {showStory ? (
                <div className="story_open container flex flex-col items-center justify-center absolute z-50 top-0 w-[500px] h-screen">
                    <div className="info__top">
                        <p>AmitxParmar</p>
                        <div className="w-6">
                            <img
                                src="/public/images/fallback.png"
                                alt="story"
                                onClick={() => exitStory(false)}
                            />
                        </div>
                    </div>
                    <img className='max-w-[500px]'
                        src={`https://source.unsplash.com/collection/1346951/800x800?sig=${Math.random()}`}
                        alt="story"
                    />
                    <div className="absolute bottom-0 text-white border rounded-full p-5 w-full m-3">
                        <label for="send-story-msg"></label>
                        <input className='' type="text" id="send-story-msg" />{" "}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default StoryOpen;

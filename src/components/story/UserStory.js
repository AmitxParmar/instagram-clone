import './style.css';

import React from 'react';

const UserStory = ({ show }) => {
    return (
        <div className="story">
            <div className="flex justify-center items-center flex-col mx-2">
                <div className="story__border">
                    <img
                        className="w-full h-full rounded-full"
                        src={`https://picsum.photos/200/300?random=${Math.random()}`}
                        onClick={() => show(true)}
                        alt="story list"
                    />
                </div>
                <p className="text-xs">AmitxParmar</p>
            </div>
        </div>
    );
};

export default UserStory;


import React from 'react';

const UserStory = ({ show }) => {
    return (
        <div className="flex flex-col items-center space-y-1 cursor-pointer mx-1">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-full">
                <div className="bg-white p-[2px] rounded-full">
                    <img
                        className="h-14 w-14 rounded-full"
                        src={`https://picsum.photos/200/300?random=${Math.random()}`}
                        onClick={() => show(true)}
                        alt="story list"
                    />
                </div>
                <p className="max-w-[58px] truncate text-xs"> AmitxParmar </p>
            </div>
        </div>
    );
};

export default UserStory;

import React from "react";


const Story = ({ img, userName }) => {
    return (
        <div>
            <img
                className="h-14 my-6 w-14 rounded-full p-[1.5px] border-x-yellow-500 border-y-pink-600 border-4
        cursor-pointer hover:scale-110 
        transition-transform
        duration-200 ease-out"
                src={img}
                alt="story"
            />
            <p className="text-xs w-14 truncate text-center">{userName}</p>
        </div>
    );
};
export default Story;
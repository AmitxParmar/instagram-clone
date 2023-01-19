import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import Story from "./Story";

const Stories = ({ userData }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            avatar: faker.image.avatar(),
            id: i,
        }));
        setSuggestions(suggestions);
    }, []);

    return (
        <div className="container border border-gray-base">
            <div
                className="flex space-x-2 relative bg-black-hard items-center justify-center rounded-sm overflow-x-scroll scrollbar-thin scrollbar-hide"
            >
                {userData && (
                    <Story img={userData?.ProfilePic} username={userData?.UserName} />
                )}

                {suggestions.map((profile) => (
                    <Story
                        key={profile.id}
                        img={profile.avatar}
                        username={profile.username}
                    />
                ))}
            </div>
        </div>
    );
};

export default Stories
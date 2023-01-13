import React from 'react';

const Footer = () => {
    return (
        <div className='flex flex-wrap'>
            <ul className="flex flex-wrap relative pt-2 gap-1 text-[9px] text-gray-base">
                <li>{" "}About</li>
                <li>Help</li>
                <li>Press</li>
                <li>API</li>
                <li>Jobs</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Locations</li>
                <li>Top Accounts</li>
                <li>Hashtags</li>
                <li>Language</li>
            </ul>
        </div>
    );
};

export default Footer;
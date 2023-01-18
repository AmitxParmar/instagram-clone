import React from 'react';

const Footer = () => {
    return (
        <div className='flex flex-wrap text-xs text-gray-base'>
            <ul className="flex flex-wrap relative py-2 gap-1">
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
            <p>© 2023 INSTAGRAM FROM META</p>
        </div>
    );
};

export default Footer;
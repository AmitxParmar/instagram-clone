import React, { useEffect } from 'react';


const NotFound = () => {
    useEffect(() => {
        document.title = 'Not Found - Instagram';
    }, []);

    return (
        <div className='bg-gray-background'>
            <div className='mx-auto max-w-screen-lg'>
                <p className='text-center text-2xl'>User Not Found!</p>
            </div>
        </div>
    );
};


export default NotFound;
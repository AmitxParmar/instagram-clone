import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* eslint-disable jsx-a11y/img-redundant-alt */
export default function Header({ userName, profilePic }) {
    // NOTE: Do something 
    return (
        <div className='flex border-b border-gray-primary h-4 p-4 py-8'>
            <div className='flex items-center'>
                <Link className='flex items-center'>

                    <img
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={profilePic}
                        alt={`${userName} profile picture`}
                    />
                    <p className='font-bold'>{userName}</p>
                </Link>
            </div>
        </div>
    );
}

Header.propTypes = {
    userName: PropTypes.string.isRequired
};
/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types'
import { Link } from
    'react-router-dom';

export default function Header({ userName }) {
    return (
        <div className='flex border-b border-gray-primary h-4 p-4 py-8'>
            <div className='flex items-center'>
                <Link className='flex items-center'>

                    <img
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={`/images/avatars/${userName}.jpg`}
                        alt={`${userName} profile picture`}
                    />
                    <p className='font-bold'>{userName}</p>
                </Link>
            </div>
        </div>
    );
}
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../../constants/Paths';


const User = ({ userName, fullName }) => {
    const capitalize = (mySentence) => (mySentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));
    return !userName || !fullName ?
        (
            <Skeleton count={1} height={61} />
        ) : (
            <Link to={`/p/${userName}`}
                className='grid grid-cols-4 gap-4 mb-6 items-center'>
                <div className='flex items-center justify-between col-span-1'>
                    <img
                        className='rounded-full w-16 flex mr-3'
                        src={`/images/avatars/${userName}.jpg`}
                        alt=""
                        onError={(e) => {
                            e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                    />
                </div>
                <div className='col-span-3'>
                    <p className='font-bold text-sm'>
                        {capitalize(fullName)}
                    </p>
                </div>
            </Link>
        );
};
User.propTypes = {
    userName: PropTypes.string,
    fullName: PropTypes.string
};

export default User;
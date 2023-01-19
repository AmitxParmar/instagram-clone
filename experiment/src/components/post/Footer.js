import PropTypes from 'prop-types';

export default function Footer({ caption, userName }) {
    return (
        <div className='drop-shadow-none p-4 pt-2 pb-2 border-b border-gray-primary'>
            <span className='mr-1'>{`${userName}`}</span>
            <span className='italic text-sm text-gray-base'>{caption}</span>
        </div>
    );
}
Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};
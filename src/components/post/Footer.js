import PropTypes from 'prop-types';

export default function Footer({ caption, userName }) {
    return (
        <div className='p-4 pt-2 pb-2 border-b border-gray-primary'>
            <span className='mr-1 font-bold'>{`${userName}`}</span>
            <span className='italic'>{caption}</span>
        </div>
    );
}
Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};
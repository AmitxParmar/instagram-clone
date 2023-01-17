import PropTypes from 'prop-types';
import { useRef } from 'react';

import Actions from './Actions';
import Comments from './Comments';
import Footer from './Footer';
import Header from './Header';
import Image from './Image';

export default function Post({ content }) {
    console.log("🚀 ~ file: index.js:11 ~ Post ~ content", content);

    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    // components
    // -> header, image, actions (like & comment icons), footer, comments

    return (
        <div className="capitalize sm:w-full sm:relative col-span-4 border bg-white border-gray-primary mb-12">
            <Header userName={content.userName} profilePic={content.profilePic} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer caption={content.caption} userName={content.userName} />
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    );
}

Post.propTypes = {
    content: PropTypes.shape({
        userName: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
};

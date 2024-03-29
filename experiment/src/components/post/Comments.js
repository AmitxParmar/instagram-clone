import formatDistance from 'date-fns/formatDistance';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AddComment from './AddComment';

export default function Comments({ docId, comments: allComments, posted, commentInput }) {

    const [comments, setComments] = useState(allComments);
    const [commentsSlice, setCommentsSlice] = useState(3);

    const showNextComments = () => setCommentsSlice(commentsSlice + 3);

    return (
        <>
            <div className="px-10 p-4 pt-1 pb-4 mt-2">
                {comments.slice(0, commentsSlice).map((item) => (
                    <p key={`${item.comment}-${item.displayName}`} className="mb-1 text-gray-background">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1.5 underline hover:underline">
                                {`${item.displayName} >`}
                            </span>
                        </Link>
                        <span className='text-white text-xs font-sans'>{item.comment}</span>
                    </p>
                ))}
                {comments.length >= 3 && commentsSlice < comments.length && (
                    <button
                        className="text-xs text-gray-base mb-1 cursor-pointer focus:outline-none"
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                showNextComments();
                            }
                        }}
                    >
                        View more comments
                    </button>
                )}
                <p className="text-gray-base uppercase text-xs mt-2">
                    {formatDistance(posted, new Date(), { addSuffix: true })}
                </p>
            </div>
            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />

        </>
    );
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
};

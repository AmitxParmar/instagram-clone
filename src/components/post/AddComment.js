import PropTypes from 'prop-types';
import { useState } from 'react';

import { useAuth } from '../../hooks/AuthContext';
import { arrayUnion, db, doc, updateDoc } from '../../lib/FirebaseConfig';

export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');

    const { user: { displayName } } = useAuth();

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([...comments, { displayName, comment }]);
        setComment('');
        const docRef = doc(db, "photos", docId);

        updateDoc(docRef, {
            comments:
                arrayUnion({ displayName, comment })
        });
    };

    return (
        <div className="border-b border-t bg-black-hard border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) =>
                    comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                }
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm bg-black-hard text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
};

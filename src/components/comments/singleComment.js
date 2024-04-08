import React from 'react';
import './comment.css';

const SingleComment = ({ comment }) => {
    return (
        <div className='comment'>
            <p id='user'>{comment.author_name} | {comment.date_created}</p>
            <p id='content'>{comment.content}</p>
        </div>
    );
};

export default SingleComment;
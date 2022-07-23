/* eslint-disable indent */
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
// import { createComment } from '../reducers/commentsReducer';
import commentsService from '../services/comments';

const Comments = ({ blogId }) => {
  // const dispatch = useDispatch();
  const comment = useField('text');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentsService.getAll(blogId).then((response) => {
      setComments(response);
    });
  }, [blogId]);

  const onClickAddComment = () => {
    const text = comment.props.value;
    if (text) {
      commentsService.create(blogId, text);
      comment.reset();
      // dispatch(createComment(blogId, text));
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form className='commentForm'>
        <input className='commentInput' {...comment.props} />{' '}
        <button
          type='submit'
          className='commentForm'
          onClick={onClickAddComment}
        >
          add comment
        </button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;

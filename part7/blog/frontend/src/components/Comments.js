/* eslint-disable indent */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useField } from '../hooks';
import { getComments, createComment } from '../reducers/commentsReducer';

const Comments = ({ blogId }) => {
  const comment = useField('text');
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(blogId));
  }, [dispatch]);

  const onClickAddComment = async (event) => {
    event.preventDefault();
    const text = comment.props.value;
    if (text) {
      dispatch(createComment(blogId, text));
      comment.reset();
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

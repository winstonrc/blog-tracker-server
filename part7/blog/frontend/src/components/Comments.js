/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createComment } from '../reducers/commentsReducer';
import commentsService from '../services/comments';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const comment = useField('text');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentsService.getAll(blog).then((reponse) => {
      setComments(reponse);
    });
  }, [blog]);

  const onClickAddComment = () => {
    const text = comment.props.value;
    dispatch(createComment(blog, text));
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
        {comments !== null
          ? comments.map((c) => {
              <li key={c.id}>{c.text}</li>;
            })
          : null}
      </ul>
    </div>
  );
};

export default Comments;

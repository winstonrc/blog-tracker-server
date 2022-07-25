/* eslint-disable indent */
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createComment } from '../reducers/commentsReducer';
import { TextField, Button } from '@mui/material';

const CommentForm = ({ blogId }) => {
  const comment = useField('text');
  const dispatch = useDispatch();

  const onClickAddComment = async (event) => {
    event.preventDefault();

    // prevent empty comment
    if (comment.props.value === '') {
      return;
    }

    const text = comment.props.value;
    if (text) {
      dispatch(createComment(blogId, text));
      comment.reset();
    }
  };

  return (
    <div>
      <form className="commentForm">
        <TextField
          label="new comment"
          className="commentInput"
          {...comment.props}
        />
        <br></br>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="commentForm"
          onClick={onClickAddComment}
        >
          add
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;

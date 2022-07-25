import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { TextField, Button } from '@mui/material';

const BlogForm = ({ onCreateSuccess }) => {
  const dispatch = useDispatch();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const addBlog = async (event) => {
    event.preventDefault();

    if (title.props.value === '') {
      dispatch(setNotification('Error: A title is required', 'error'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return null;
    }

    if (url.props.value === '') {
      dispatch(setNotification('Error: An URL is required', 'error'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return null;
    }

    dispatch(
      createBlog({
        title: title.props.value,
        author: author.props.value,
        url: url.props.value,
        likes: 0,
      })
    );

    dispatch(
      setNotification(`${title.props.value} added to blog list`, 'success')
    );
    title.reset();
    author.reset();
    url.reset();
    onCreateSuccess();
  };

  return (
    <div>
      <h2>Add a blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <TextField label="Title" {...title.props} />
        </div>
        <br></br>
        <div>
          <TextField label="Author" {...author.props} />
        </div>
        <br></br>
        <div>
          <TextField label="URL" {...url.props} />
        </div>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="form"
        >
          add
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;

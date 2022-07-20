import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ onCreateSuccess }) => {
  const dispatch = useDispatch();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const addBlog = async (event) => {
    event.preventDefault();

    if (title.value === '') {
      dispatch(setNotification('Error: A title is required', 'red'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return null;
    }

    if (url.value === '') {
      dispatch(setNotification('Error: An URL is required', 'red'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return null;
    }

    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
        likes: 0,
      })
    );

    dispatch(setNotification(`${title.value} added to blog list`, 'green'));
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
          title: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input className='titleInput' {...title} reset={null} />
        </div>

        <div>
          author: &nbsp;
          <input className='authorInput' {...author} reset={null} />
        </div>

        <div>
          url: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input className='urlInput' {...url} reset={null} />
        </div>

        <button type='submit' className='form'>
          add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

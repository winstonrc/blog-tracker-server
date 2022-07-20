import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ onCreateSuccess }) => {
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    if (newTitle === '') {
      dispatch(setNotification('Error: A title is required', 'red'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return null;
    }

    if (newUrl === '') {
      dispatch(setNotification('Error: An URL is required', 'red'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return null;
    }

    dispatch(
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
      })
    );

    dispatch(setNotification(`${newTitle} added to blog list`, 'green'));
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
    onCreateSuccess();
  };

  return (
    <div>
      <h2>Add a blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={newTitle}
            onChange={handleTitleChange}
            className='titleInput'
          />
        </div>

        <div>
          author: &nbsp;
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
            className='authorInput'
          />
        </div>

        <div>
          url: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={newUrl}
            onChange={handleUrlChange}
            className='urlInput'
          />
        </div>

        <button type='submit' className='form'>
          add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

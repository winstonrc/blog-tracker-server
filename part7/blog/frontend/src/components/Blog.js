import { useLabel, useBoolean } from '../hooks/';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showDetails = useBoolean('boolean');
  const label = useLabel('text', 'expand', 'collapse');
  const dispatch = useDispatch();

  const toggleShowDetails = () => {
    showDetails.toggle();
    label.toggle();
  };

  const onClickLike = async (event) => {
    event.preventDefault();
    dispatch(likeBlog(blog));
  };

  const onClickRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} &nbsp;{' '}
      <button onClick={toggleShowDetails} className='toggleDetailsButton'>
        {label.value}
      </button>
      {showDetails.value ? (
        <div>
          <div className='blogAuthor'>{blog.author}</div>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>
            Likes: {blog.likes} &nbsp;{' '}
            <button onClick={onClickLike} className='addLikeButton'>
              like
            </button>
          </div>
          {blog.user.username === user.username ? (
            <button
              onClick={() => onClickRemove(blog)}
              className='removeBlogButton'
            >
              remove
            </button>
          ) : null}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Blog;

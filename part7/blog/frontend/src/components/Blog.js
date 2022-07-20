import { useState } from 'react';
import { useLabel } from '../hooks/';
import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);
  // const [label, setLabel] = useState('expand');
  const label = useLabel('text', 'expand', 'collapse');
  const dispatch = useDispatch();

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
    label.toggle();
  };

  const onClickLike = async (event) => {
    event.preventDefault();
    dispatch(likeBlog(blog));
  };

  const onClickRemove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const showRemoveButton = () => {
    if (user && blog.user) {
      return blog.user.username === user.username ? (
        <div>
          <button onClick={onClickRemove} className='removeBlogButton'>
            remove
          </button>
        </div>
      ) : null;
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} &nbsp;{' '}
      <button onClick={toggleShowDetails} className='toggleDetailsButton'>
        {label.value}
      </button>
      {showDetails ? (
        <div>
          <div className='blogAuthor'>{blog.author}</div>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>
            Likes: {blog.likes} &nbsp;{' '}
            <button onClick={onClickLike} className='addLikeButton'>
              like
            </button>
          </div>
          {showRemoveButton()}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Blog;

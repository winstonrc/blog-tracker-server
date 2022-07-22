import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch('/blogs/:id');

  const { user, blogs } = useSelector((state) => state);

  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  if (!user || !blog) {
    return null;
  }

  const onClickLike = async (blog) => {
    dispatch(likeBlog(blog));
  };

  const onClickRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      navigate('/');
    }
  };

  return (
    <div className='blog-detail'>
      <h2>{blog.title}</h2>
      <div>
        <div className='blogAuthor'>{blog.author}</div>
        <div className='blogUrl'>{blog.url}</div>
        <div className='blogLikes'>
          Likes: {blog.likes} &nbsp;{' '}
          <button onClick={() => onClickLike(blog)} className='addLikeButton'>
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
    </div>
  );
};

export default Blog;

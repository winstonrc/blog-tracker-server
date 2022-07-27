import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate, Link } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import Comments from './Comments';

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch('/blogs/:id');

  const { user, blogs } = useSelector((state) => state);

  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  if (!blog) {
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
    <div className="blog-detail">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <a href={blog.url} className="blogUrl">
          {blog.url}
        </a>
        <div className="blogLikes">
          Likes: {blog.likes} &nbsp;{' '}
          <button onClick={() => onClickLike(blog)} className="addLikeButton">
            like
          </button>
        </div>
        <div>
          Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </div>
        {user && blog.user.username === user.username ? (
          <button
            onClick={() => onClickRemove(blog)}
            className="removeBlogButton"
          >
            remove
          </button>
        ) : null}
      </div>
      <Comments blogId={blog.id} />
    </div>
  );
};

export default Blog;

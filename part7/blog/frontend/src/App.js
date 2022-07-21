import { useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogFormLabel from './components/BlogFormLabel';
import Blog from './components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from './reducers/blogsReducer';
import { getUserFromLocal, logout } from './reducers/userReducer';

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // check for logged in user when page loads
  useEffect(() => {
    dispatch(getUserFromLocal());
  }, [dispatch]);

  // fetch blogs from server
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div>
      <h1>Blogs</h1>

      {notification && <Notification />}

      {user === null ? (
        // if user is logged out
        <LoginForm />
      ) : (
        // if user is logged in
        <div>
          <p>
            Logged in as {user.name}{' '}
            {
              <button
                className='logoutButton'
                onClick={() => dispatch(logout())}
              >
                logout
              </button>
            }
          </p>

          <BlogFormLabel />

          <br></br>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

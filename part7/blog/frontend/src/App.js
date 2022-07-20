import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import BlogFormLabel from './components/BlogFormLabel';

const App = () => {
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // fetch blogs from server
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // check for logged in user when page loads
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(setNotification(`Welcome ${user.name}`, 'green'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      dispatch(setNotification('Invalid credentials', 'red'));
      setPassword('');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem('loggedInUser');
      await blogService.setToken('');
      setUser(null);
    } catch (error) {
      dispatch(setNotification('Unable to logout', 'red'));
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      {notification && <Notification />}
      {user === null ? (
        // if user is logged out
        loginForm()
      ) : (
        // if user is logged in
        <div>
          <p>
            Logged in as {user.name}{' '}
            {
              <button className='logoutButton' onClick={handleLogout}>
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

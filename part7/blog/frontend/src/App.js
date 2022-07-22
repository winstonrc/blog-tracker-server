import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Notification from './components/Notification';
import Menu from './components/Menu';
import LoginForm from './components/LoginForm';
import BlogFormLabel from './components/BlogFormLabel';
import BlogList from './components/BlogList';
import Users from './components/Users';
import { getUserFromLocal, logout } from './reducers/userReducer';

const path = {
  home: '/',
  users: '/users',
  user: '/users/:id',
  blog: '/blogs/:id',
};

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // check for logged in user when page loads
  useEffect(() => {
    dispatch(getUserFromLocal());
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
          <Menu homePath={path.home} usersPath={path.users} />
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

          <Routes>
            <Route path={path.users} element={<Users />} />
            <Route path={path.home} element={<BlogList />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;

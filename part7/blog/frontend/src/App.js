import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUserFromLocal, logout } from './reducers/userReducer';
import Notification from './components/Notification';
import Menu from './components/Menu';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Users from './components/Users';
import User from './components/User';

const path = {
  home: '/',
  users: '/users',
  user: '/users/:id',
  blog: '/blogs/:id',
};

const App = () => {
  const notification = useSelector((state) => state.notification);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // check for logged in user when page loads
  useEffect(() => {
    dispatch(getUserFromLocal());
  }, [dispatch]);

  const handleLogout = (event) => {
    event.preventDefault();
    navigate('/');
    dispatch(logout());
  };

  return (
    <div>
      <h1>Blogs</h1>

      {notification && <Notification />}

      {currentUser === null ? (
        // if user is logged out
        <LoginForm />
      ) : (
        // if user is logged in
        <div>
          <Menu homePath={path.home} usersPath={path.users} />
          <p>
            Logged in as {currentUser.name}{' '}
            {
              <button className='logoutButton' onClick={handleLogout}>
                logout
              </button>
            }
          </p>
          <Routes>
            <Route path={path.home} element={<BlogList />} />
            <Route path={path.blog} element={<BlogDetail />} />
            <Route path={path.users} element={<Users />} />
            <Route path={path.user} element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;

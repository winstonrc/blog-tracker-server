import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getUserFromLocal } from './reducers/userReducer';
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
  blogs: '/blogs',
  blog: '/blogs/:id',
};

const App = () => {
  const notification = useSelector((state) => state.notification);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // check for logged in user when page loads
  useEffect(() => {
    dispatch(getUserFromLocal());
  }, [dispatch]);

  if (currentUser === null) {
    return (
      <div>
        {notification && <Notification />}
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Menu blogsPath={path.blogs} usersPath={path.users} />
      {notification && <Notification />}
      <h1>Blogs</h1>

      <Routes>
        <Route path={path.home} element={<BlogList />} />
        <Route path={path.blogs} element={<BlogList />} />
        <Route path={path.blog} element={<BlogDetail />} />
        <Route path={path.users} element={<Users />} />
        <Route path={path.user} element={<User />} />
      </Routes>
    </div>
  );
};

export default App;

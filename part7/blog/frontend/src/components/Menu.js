import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

const Menu = ({ loginPath, blogsPath, usersPath }) => {
  const logoutStyle = {
    fontSize: 10,
  };

  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="primary" aria-label="menu"></IconButton>
        {currentUser ? (
          <div>
            Logged in as <strong>{currentUser.name}</strong>
            <Button
              color="inherit"
              type="submit"
              className="logoutButton"
              onClick={handleLogout}
            >
              <div style={logoutStyle}>(Logout)</div>
            </Button>
          </div>
        ) : (
          <Button color="inherit" component={Link} to={loginPath}>
            login
          </Button>
        )}
        &nbsp;|
        <Button color="inherit" component={Link} to={blogsPath}>
          blogs
        </Button>
        <Button color="inherit" component={Link} to={usersPath}>
          users
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;

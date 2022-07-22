import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

const Menu = ({ blogsPath, usersPath }) => {
  const menuStyle = {
    backgroundColor: '#d3d3d3',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const padding = {
    padding: 5,
  };

  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    navigate('/');
    dispatch(logout());
  };

  return (
    <div style={menuStyle}>
      <Link style={padding} to={blogsPath}>
        blogs
      </Link>
      <Link style={padding} to={usersPath}>
        users
      </Link>
      Logged in as {currentUser.name}{' '}
      {
        <button className='logoutButton' onClick={handleLogout}>
          logout
        </button>
      }
    </div>
  );
};

export default Menu;

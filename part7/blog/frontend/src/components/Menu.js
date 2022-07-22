import { Link } from 'react-router-dom';

const Menu = ({ homePath, usersPath }) => {
  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Link style={padding} to={homePath}>
        home
      </Link>
      <Link style={padding} to={usersPath}>
        users
      </Link>
    </div>
  );
};

export default Menu;

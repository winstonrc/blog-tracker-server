import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usersService from '../services/users';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <h3># of blogs created</h3>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>
            <strong>{user.name}</strong>
          </Link>
          {' - '}
          {user.blogs.length}
        </li>
      ))}
    </div>
  );
};

export default User;

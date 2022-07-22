import { useEffect, useState } from 'react';
import usersService from '../services/users';

const User = () => {
  // const users = useSelector((state) => state.users);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <h3>blogs created</h3>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} {user.blogs.length} blogs
        </p>
      ))}
    </div>
  );
};

export default User;

import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import usersService from '../services/users';

const User = () => {
  const [user, setUser] = useState(null);
  const match = useMatch('/users/:id');
  const id = match ? match.params.id : null;

  useEffect(() => {
    if (id) {
      usersService.getById(id).then((response) => {
        setUser(response);
      });
    }
  }, [id]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <ul key={blog.id}>
          <li>{blog.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default User;

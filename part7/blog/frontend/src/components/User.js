import { useEffect, useState } from 'react';
import { useMatch, Link } from 'react-router-dom';
import usersService from '../services/users';
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;

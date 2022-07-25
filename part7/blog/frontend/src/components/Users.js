import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <strong># of blogs</strong>
              </TableCell>
            </TableRow>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    <strong>{user.name}</strong>
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;

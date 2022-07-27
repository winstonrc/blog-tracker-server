/* eslint-disable indent */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../reducers/commentsReducer';
import CommentForm from './CommentForm';
import {
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const Comments = ({ blogId }) => {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(blogId));
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      <br></br>
      <CommentForm blogId={blogId} />
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Comments</strong>
              </TableCell>
            </TableRow>
            {comments
              .slice()
              .reverse()
              .map((c) => (
                <TableRow key={c.id}>
                  {c.user ? (
                    <TableCell>
                      <strong>{c.user.name}</strong>: {c.text} <br></br>(
                      {formatDate(c.date)})
                    </TableCell>
                  ) : (
                    <TableCell>
                      {c.text}
                      <br></br>({formatDate(c.date)})
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Comments;

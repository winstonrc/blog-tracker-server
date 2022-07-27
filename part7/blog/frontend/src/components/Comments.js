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

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm blogId={blogId} />
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {comments
              .slice()
              .reverse()
              .map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.text}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Comments;

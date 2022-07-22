import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    console.log(usersService.getAll());
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;

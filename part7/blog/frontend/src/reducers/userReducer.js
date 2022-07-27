import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import userUtils from '../utils/userUtils';
import tokenUtils from '../utils/tokenUtils';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      const user = action.payload;

      if (user === null) {
        userUtils.remove();
        tokenUtils.setToken(null);
      } else {
        userUtils.save(user);
        tokenUtils.setToken(user.token);
      }

      return user;
    },
  },
});

export const { setUser } = userSlice.actions;

export const login = (usernameObject, passwordObject) => {
  return async (dispatch) => {
    try {
      const username = usernameObject.props.value;
      const password = passwordObject.props.value;
      const user = await loginService.login({ username, password });
      dispatch(setUser(user)) &&
        dispatch(setNotification(`Welcome ${user.name}`, 'success'));
    } catch (error) {
      console.log('login failed', error);
      passwordObject.reset();
      dispatch(setNotification('Invalid credentials', 'error'));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null)) &&
      dispatch(setNotification('Successfully logged out', 'success'));
  };
};

export const getUserFromLocal = () => {
  return async (dispatch) => {
    const user = userUtils.get();
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;

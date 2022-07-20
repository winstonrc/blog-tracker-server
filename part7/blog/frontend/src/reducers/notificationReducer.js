import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(_state, action) {
      return action.payload;
    },
  },
});

export const { setMessage } = notificationSlice.actions;

let timeout = null;

export const setNotification = (message, color, seconds) => {
  return async (dispatch) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (color !== 'red' && color !== 'green') {
      color = 'red';
    }

    dispatch(setMessage({ message, color }));

    if (!seconds) {
      seconds = 5;
    }

    timeout = setTimeout(() => {
      dispatch(setMessage(null));
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    },
})

export const { setMessage, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return dispatch => {
        dispatch(setMessage(message))

        setTimeout(() => {
            dispatch(clearNotification())
        }, seconds * 1000);
    }
}

export default notificationSlice.reducer

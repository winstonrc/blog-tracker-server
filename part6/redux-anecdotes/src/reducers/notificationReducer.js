import { createSlice } from "@reduxjs/toolkit"

const initialState = null
let timeout= null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    },
})

export const { setMessage, removeNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return dispatch => {
        if (timeout) {
            clearTimeout(timeout)
        }

        dispatch(setMessage(message))

        timeout = setTimeout(() => {
            dispatch(removeNotification())
            timeout = null
        }, seconds * 1000);
    }
}

export default notificationSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            token: null
        },
        reducers: {
            login: (state, action) => {
                state.token = action.payload;
            },
            logout: (state, action) => {
                state.token = null;
            }
        }
    }
);

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
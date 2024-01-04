import { configureStore } from '@reduxjs/toolkit';
import auth from '../redux/authSlice';

export default configureStore(
    {
        reducer: {
            auth: auth,
        },
    }
);

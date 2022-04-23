import { configureStore } from '@reduxjs/toolkit';
import navLinkReducer from './slice/navLinkSlice.js';
import userReducer from './slice/userSlice.js';

export const store = configureStore({
  reducer: {
    navLink: navLinkReducer,
    user: userReducer,
  },
});

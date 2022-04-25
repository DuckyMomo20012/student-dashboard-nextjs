import { configureStore } from '@reduxjs/toolkit';
import navLinkReducer from './slice/navLinkSlice.js';

export const store = configureStore({
  reducer: {
    navLink: navLinkReducer,
  },
});

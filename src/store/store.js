import { configureStore } from '@reduxjs/toolkit';
import navLinkReducer from './slice/navLinkSlice.js';
import tableReducer from './slice/tableSlice.js';

export const store = configureStore({
  reducer: {
    activeNavLink: navLinkReducer,
    table: tableReducer,
  },
});

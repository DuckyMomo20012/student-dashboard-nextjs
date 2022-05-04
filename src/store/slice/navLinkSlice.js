import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'Home',
};

export const navLinkSlice = createSlice({
  name: 'activeNavLink',
  initialState,
  reducers: {
    updateActiveLink: (state, action) => {
      const { payload } = action;
      state.value = payload;
    },
  },
});

export const { updateActiveLink } = navLinkSlice.actions;

export default navLinkSlice.reducer;

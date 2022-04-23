import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'Home',
};

export const navLinkSlice = createSlice({
  name: 'navLink',
  initialState,
  reducers: {
    setLink: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
});

export const { setLink } = navLinkSlice.actions;

export default navLinkSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.value = payload;
    },
  },
});

export const { setUser } = userState.actions;

export default userState.reducer;

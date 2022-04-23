import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
});

export const { setUser } = userState.actions;

export default userState.reducer;

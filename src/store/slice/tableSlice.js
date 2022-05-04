import cloneDeep from 'lodash/cloneDeep';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: [],
  data: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state.columns.push(action.payload);
    },
    updateColumn: (state, action) => {
      state.columns = cloneDeep(action.payload);
    },
    updateData: (state, action) => {
      state.data = cloneDeep(action.payload);
    },
  },
});

export const { addColumn, updateColumn, updateData } = tableSlice.actions;

export default tableSlice.reducer;

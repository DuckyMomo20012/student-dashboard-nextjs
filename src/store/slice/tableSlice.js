import { BASE_COL_NAME, BASE_COL_TYPE } from '@constant/index.js';

import { consecutiveInsert } from '@util/consecutiveInsert.js';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: [],
  data: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addColumn: (state) => {
      const columns = [...state.columns];
      const dup = columns
        .filter((col) => col.accessor.includes(BASE_COL_NAME))
        .map((col) => col.accessor);
      const newColName = consecutiveInsert(dup, BASE_COL_NAME, ' ');

      state.columns.splice(-1, 0, {
        accessor: newColName,
        columnType: BASE_COL_TYPE,
      });

      state.data = state.data.map((row) => ({ ...row, [newColName]: '' }));
    },
    updateColumn: (state, action) => {
      state.columns = [...action.payload];
    },
    updateData: (state, action) => {
      state.data = [...action.payload];
    },
    addRowBelow: (state, action) => {
      const { payload: indexRow } = action;
      const nameCol = Object.keys(state.data[0]);
      const newRow = Object.fromEntries(nameCol.map((name) => [name, '']));
      state.data.splice(indexRow + 1, 0, newRow);
    },
    addLastRow: (state) => {
      const nameCol = Object.keys(state.data[0]);
      const newRow = Object.fromEntries(nameCol.map((name) => [name, '']));
      state.data.push(newRow);
    },
  },
});

export const { addColumn, updateColumn, updateData, addRowBelow, addLastRow } =
  tableSlice.actions;

export default tableSlice.reducer;

import cloneDeep from 'lodash/cloneDeep';
import { createSlice } from '@reduxjs/toolkit';
import zipObject from 'lodash/zipObject';

const initialState = {
  columns: [],
  data: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addColumn: (state) => {
      // First we first if there w
      // const colName = 'property';
      // state.columns.forEach((col) => {
      //   if (col.accessor === colName) {
      //   }
      // });
      // state.columns.push({ accessor: colName, columnType: 'text' });
      // state.data.forEach((record) => {
      //   // record['pro']
      // });
    },
    updateColumn: (state, action) => {
      state.columns = cloneDeep(action.payload);
    },
    updateData: (state, action) => {
      state.data = cloneDeep(action.payload);
    },
    addRowBelow: (state, action) => {
      const { payload: indexRow } = action;
      const numCol = Object.keys(state.data[0]);
      const newRow = zipObject(numCol, Array(numCol.length).fill(''));
      state.data.splice(indexRow + 1, 0, newRow);
    },
    addRowAbove: (state, action) => {
      const { payload: indexRow } = action;
      const numCol = Object.keys(state.data[0]);
      const newRow = zipObject(numCol, Array(numCol.length).fill(''));
      state.data.splice(indexRow, 0, newRow);
    },
    addLastRow: (state) => {
      const numCol = Object.keys(state.data[0]);
      const newRow = zipObject(numCol, Array(numCol.length).fill(''));
      state.data.push(newRow);
    },
  },
});

export const { addColumn, updateColumn, updateData, addRowBelow, addLastRow } =
  tableSlice.actions;

export default tableSlice.reducer;

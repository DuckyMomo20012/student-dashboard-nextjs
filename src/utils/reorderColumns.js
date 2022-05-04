import cloneDeep from 'lodash/cloneDeep';

export function reorderColumns(columns, startIndex, endIndex) {
  const updatedColumns = cloneDeep(columns);
  const [removed] = updatedColumns.splice(startIndex, 1);
  updatedColumns.splice(endIndex, 0, removed);
  return updatedColumns;
}

export function reorderColumns(columns, startIndex, endIndex) {
  const updatedColumns = [...columns];
  const [removed] = updatedColumns.splice(startIndex, 1);
  updatedColumns.splice(endIndex, 0, removed);
  return updatedColumns;
}

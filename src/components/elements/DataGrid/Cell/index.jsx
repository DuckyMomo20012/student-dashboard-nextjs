import { Box, Text } from '@mantine/core';
import { formatDate } from '@util/formatDate.js';

const Cell = ({ value, cell }) => {
  const { columnType } = cell.column;
  let colValue = value;
  if (columnType === 'date') {
    colValue = formatDate(new Date(value));
  }
  return (
    <Box className="overflow-x-hidden whitespace-nowrap">
      <Text>{colValue}</Text>
    </Box>
  );
};

export { Cell };
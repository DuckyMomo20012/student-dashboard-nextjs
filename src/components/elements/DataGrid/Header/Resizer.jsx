import { Box } from '@mantine/core';

const Resizer = ({ column, ...others }) => {
  return (
    <Box
      {...others}
      className={`w-4px h-1/1 z-1 absolute right-0 top-0 inline-block translate-x-1/2 transform hover:bg-blue-500 ${
        column.isResizing && 'select-none bg-blue-500'
      }`}
    />
  );
};

export { Resizer };

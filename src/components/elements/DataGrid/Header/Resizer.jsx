import { Box } from '@mantine/core';

const Resizer = ({ column, ...others }) => {
  return (
    <Box
      {...others}
      className={`w-4px z-1 absolute inset-y-0 right-0 inline-block translate-x-1/2 transform hover:bg-blue-500 ${
        column.isResizing ? 'select-none bg-blue-500' : ''
      }`}
    />
  );
};

export { Resizer };

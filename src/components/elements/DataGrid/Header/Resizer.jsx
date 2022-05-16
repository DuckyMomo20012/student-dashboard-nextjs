import { Box } from '@mantine/core';

const Resizer = ({ column, ...others }) => {
  return (
    <Box
      {...others}
      className={`w-4px z-1 hover:bg-primary-500 absolute inset-y-0 right-0 inline-block translate-x-1/2 transform ${
        column.isResizing ? 'bg-primary-500 select-none' : ''
      }`}
    />
  );
};

export { Resizer };

import { ActionIcon, Group } from '@mantine/core';

import { Icon } from '@iconify/react';
import { addRowBelow } from '@store/slice/tableSlice.js';
import { useDispatch } from 'react-redux';

const RowHandler = ({ dragHandleProps, indexRow }) => {
  const dispatch = useDispatch();
  function handleAddClick() {
    dispatch(addRowBelow(indexRow));
  }

  return (
    <Group
      className="absolute inset-y-0 right-full flex-nowrap opacity-0 hover:opacity-100 active:opacity-100"
      spacing={0}
    >
      <ActionIcon
        color="red"
        onClick={handleAddClick}
        radius="md"
        variant="light"
      >
        <Icon height={16} icon="ic:outline-add" width={16} />
      </ActionIcon>
      <ActionIcon
        className="w-min min-w-min"
        color="red"
        radius="sm"
        variant="light"
        {...dragHandleProps}
      >
        <Icon height={16} icon="ic:outline-drag-indicator" width={16} />
      </ActionIcon>
    </Group>
  );
};
export { RowHandler };

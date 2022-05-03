import { ActionIcon, Group } from '@mantine/core';

import { Icon } from '@iconify/react';

const RowMenu = ({ dragHandleProps }) => {
  return (
    <Group
      className="right-1/1 absolute inset-y-0 flex-nowrap opacity-0 hover:opacity-100 active:opacity-100"
      spacing={0}
    >
      <ActionIcon color="red" radius="md" variant="light">
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
export { RowMenu };

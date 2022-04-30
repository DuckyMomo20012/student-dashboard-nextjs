import { Icon } from '@iconify/react';
import { Group, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const HeaderLabel = forwardRef(
  ({ color, label, shrink = false, icon, ...others }, ref) => (
    <UnstyledButton
      className={`w-1/1 rounded-md hover:bg-${color}-100 px-2 py-1`}
      ref={ref}
      {...others}
    >
      <Group className={`text-${color}-900 flex-nowrap`} spacing={4}>
        <Icon className="flex-shrink-0" height={16} icon={icon} width={16} />
        {!shrink && <Text className="truncate">{label}</Text>}
      </Group>
    </UnstyledButton>
  ),
);

export { HeaderLabel };

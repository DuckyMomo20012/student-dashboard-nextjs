import { Center, Group, Text } from '@mantine/core';

import { Icon } from '@iconify/react';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const HeaderLabel = forwardRef(
  ({ color, label, shrink = false, icon, onClick, ...others }, ref) => {
    return (
      <Center
        className={`h-1/1 rounded-md hover:bg-${color}-50 px-2 py-1`}
        ref={ref}
        {...others}
      >
        <Group
          className={`w-1/1 text-${color}-700 flex-nowrap items-center`}
          spacing={6}
        >
          <Icon className="flex-shrink-0" height={16} icon={icon} width={16} />
          {!shrink && <Text className="truncate">{label}</Text>}
        </Group>
      </Center>
    );
  },
);

export { HeaderLabel };

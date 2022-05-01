import { Icon } from '@iconify/react';
import { Box, Center, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const HeaderLabel = forwardRef(
  ({ color, label, shrink = false, icon, ...others }, ref) => {
    return (
      <Box
        className={`h-1/1 flex items-center rounded-md hover:bg-${color}-100 px-2 py-1`}
        ref={ref}
        {...others}
      >
        <Group
          className={`w-1/1 text-${color}-900 flex-nowrap items-center`}
          spacing={6}
        >
          <Icon className="flex-shrink-0" height={16} icon={icon} width={16} />
          {!shrink && <Text className="truncate">{label}</Text>}
        </Group>
      </Box>
    );
  },
);

export { HeaderLabel };

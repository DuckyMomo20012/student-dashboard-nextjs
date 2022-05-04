import { Center, Group, Text } from '@mantine/core';

import { Icon } from '@iconify/react';
import { forwardRef } from 'react';

// NOTE: Remember to remove unnecessary props when destructuring, or menu won't
// open popper
// eslint-disable-next-line react/display-name
const HeaderLabel = forwardRef(
  ({ color, label, icon, isLabelHidden, ...others }, ref) => {
    return (
      <Center
        className={`h-full rounded-md hover:bg-${color}-50 px-2 py-1`}
        ref={ref}
        {...others}
      >
        <Group
          className={`w-full text-${color}-700 flex-nowrap items-center`}
          spacing={6}
        >
          <Icon className="flex-shrink-0" height={16} icon={icon} width={16} />
          {!isLabelHidden && (
            <Text className="truncate" transform="capitalize">
              {label}
            </Text>
          )}
        </Group>
      </Center>
    );
  },
);

export { HeaderLabel };

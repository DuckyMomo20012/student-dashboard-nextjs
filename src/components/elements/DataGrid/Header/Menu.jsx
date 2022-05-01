import { Icon } from '@iconify/react';
import { Divider, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const HeaderMenu = ({ shrink = false, control, column }) => {
  const { toggleSortBy } = column;
  const [opened, handlers] = useDisclosure(false);
  return (
    <Menu
      className={`h-1/1 ${shrink === false ? 'w-1/1' : ''}`}
      control={control}
      gutter={4}
      onClose={handlers.close}
      onOpen={handlers.open}
      opened={opened}
      placement="start"
      position="bottom"
      radius="md"
      spacing="md"
      withArrow={false}
    >
      <Menu.Item
        className="hover:bg-gray-100"
        icon={<Icon icon="ic:outline-edit" />}
      >
        Rename
      </Menu.Item>
      <Menu.Item
        className="hover:bg-gray-100"
        icon={<Icon icon="ic:outline-tune" />}
      >
        Edit property
      </Menu.Item>
      <Divider />
      <Menu.Item
        className="hover:bg-gray-100"
        icon={<Icon icon="ic:outline-north" />}
        onClick={() => {
          toggleSortBy(false);
        }}
      >
        Sort ascending
      </Menu.Item>
      <Menu.Item
        className="hover:bg-gray-100"
        icon={<Icon icon="ic:outline-south" />}
        onClick={() => {
          toggleSortBy(true);
        }}
      >
        Sort descending
      </Menu.Item>
      <Menu.Item
        className="hover:bg-gray-100"
        icon={<Icon icon="ic:outline-filter-list" />}
      >
        Filter
      </Menu.Item>
      <Divider />
      <Menu.Item
        className="hover:bg-gray-100"
        icon={<Icon icon="ic:outline-visibility-off" />}
      >
        Hide in view
      </Menu.Item>
      <Menu.Item
        className="hover:bg-gray-100"
        icon={<Icon icon="ic:outline-delete" />}
      >
        Delete property
      </Menu.Item>
    </Menu>
  );
};

export { HeaderMenu };

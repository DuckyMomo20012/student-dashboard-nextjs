import { DOMAIN } from '@constant/index.js';
import { Icon } from '@iconify/react';
import {
  Anchor,
  Box,
  Center,
  Navbar,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { setLink } from '@store/slice/navLinkSlice.js';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const mainLinksMockdata = [
  { icon: 'ic:outline-home', label: 'Home' },
  { icon: 'ic:outline-table-rows', label: 'Dashboard' },
];

function handleLogOutClick() {
  signOut({ callbackUrl: `${DOMAIN}/` });
}

function MainNavbar() {
  const activeMainLink = useSelector((state) => state.navLink.value);
  const dispatch = useDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      key={link.label}
      label={link.label}
      position="right"
      transitionDuration={0}
      withArrow
    >
      <UnstyledButton
        className={`w-44px h-44px dark:(text-dark-50 hover:bg-dark-500) hover:(bg-gray-100) flex items-center justify-center rounded-md text-gray-700${
          link.label === activeMainLink &&
          'dark:(bg-blue-900 text-blue-400) !hover:(bg-blue-50) !hover:(text-blue-700) bg-blue-50 text-blue-700'
        }`}
        key={link.label}
        onClick={() => dispatch(setLink(link.label))}
      >
        <Icon height={24} icon={link.icon} width={24} />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar
      className="border-r-1 dark:(border-r-dark-700) border-solid border-r-gray-300 bg-white"
      width={{ base: 60 }}
    >
      <Navbar.Section className="w-60px flex" grow>
        <Box className="basis-60px dark:(bg-dark-700) flex flex-shrink-0 flex-grow-0 flex-col items-center">
          <Box className="w-1/1 h-60px border-b-1 dark:border-dark-700 mb-24px pt-16px box-border flex justify-center border-solid border-gray-300">
            <Link href="/" passHref>
              <Anchor>
                <Image
                  alt="logo"
                  height={24}
                  src="/mantine-small.svg"
                  width={24}
                />
              </Anchor>
            </Link>
          </Box>
          {mainLinks}
        </Box>
      </Navbar.Section>
      <Navbar.Section className="mb-4">
        <Center>
          <UnstyledButton
            className={
              'w-44px h-44px dark:(text-dark-50 hover:bg-dark-500) hover:(bg-gray-100) flex items-center justify-center rounded-md text-gray-700'
            }
            onClick={() => toggleColorScheme()}
          >
            <Icon
              height={24}
              icon={dark ? 'ic:outline-dark-mode' : 'ic:outline-light-mode'}
              width={24}
            />
          </UnstyledButton>
        </Center>
      </Navbar.Section>
      <Navbar.Section className="mb-4">
        <Center>
          <UnstyledButton
            className={
              'w-44px h-44px dark:(text-dark-50 hover:bg-dark-500) hover:(bg-gray-100) flex items-center justify-center rounded-md text-gray-700'
            }
            onClick={handleLogOutClick}
          >
            <Icon height={24} icon="ic:outline-logout" width={24} />
          </UnstyledButton>
        </Center>
      </Navbar.Section>
    </Navbar>
  );
}

export { MainNavbar as DoubleNavbar };

import {
  Center,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { updateActiveLink } from '@store/slice/navLinkSlice.js';

const mainLinksMockdata = [
  { icon: 'ic:outline-home', label: 'Home' },
  { icon: 'ic:outline-table-rows', label: 'Dashboard' },
];

function handleLogOutClick() {
  signOut({ callbackUrl: '/' });
}

function MainNavbar() {
  const activeMainLink = useSelector((state) => state.activeNavLink.value);
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
        className={`dark:(text-dark-50 hover:bg-dark-500) hover:(bg-gray-100) h-11 w-11 rounded-md text-gray-600 ${
          link.label === activeMainLink
            ? 'dark:(bg-primary-900 text-primary-400) !hover:(bg-primary-50) !hover:(text-primary-600) bg-primary-50 !text-primary-600'
            : ''
        }`}
        key={link.label}
        onClick={() => dispatch(updateActiveLink(link.label))}
      >
        <Center>
          <Icon height={24} icon={link.icon} width={24} />
        </Center>
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar className="gap-4 bg-white" width={{ base: 60 }}>
      <Navbar.Section className="w-60px">
        <Link href="/" passHref>
          <UnstyledButton className="h-60px box-border w-full border-b border-r border-solid border-gray-300">
            <Center>
              <Image
                alt="logo"
                height={24}
                src="/mantine-small.svg"
                width={24}
              />
            </Center>
          </UnstyledButton>
        </Link>
      </Navbar.Section>
      <Navbar.Section grow>
        <Center>
          <Stack spacing="sm">{mainLinks}</Stack>
        </Center>
      </Navbar.Section>
      <Navbar.Section>
        <Center>
          <UnstyledButton
            className={
              'dark:(text-dark-50 hover:bg-dark-500) hover:(bg-gray-100) h-11 w-11 rounded-md text-gray-600'
            }
            onClick={() => toggleColorScheme()}
          >
            <Center>
              <Icon
                height={24}
                icon={dark ? 'ic:outline-dark-mode' : 'ic:outline-light-mode'}
                width={24}
              />
            </Center>
          </UnstyledButton>
        </Center>
      </Navbar.Section>
      <Navbar.Section className="mb-8">
        <Center>
          <UnstyledButton
            className={
              'dark:(text-dark-50 hover:bg-dark-500) hover:(bg-gray-100) h-11 w-11 rounded-md text-gray-600'
            }
            onClick={handleLogOutClick}
          >
            <Center>
              <Icon height={24} icon="ic:outline-logout" width={24} />
            </Center>
          </UnstyledButton>
        </Center>
      </Navbar.Section>
    </Navbar>
  );
}

export { MainNavbar };

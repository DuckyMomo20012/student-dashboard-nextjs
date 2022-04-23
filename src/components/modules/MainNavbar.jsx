import { Icon } from '@iconify/react';
import { Navbar, Tooltip, UnstyledButton } from '@mantine/core';
import { setLink } from '@store/slice/navLinkSlice.js';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const mainLinksMockdata = [
  { icon: 'ic:outline-home', label: 'Home' },
  { icon: 'ic:outline-table-rows', label: 'Dashboard' },
];
function MainNavbar() {
  const activeMainLink = useSelector((state) => state.navLink.value);
  const dispatch = useDispatch();

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionDuration={0}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => dispatch(setLink(link.label))}
        className={
          'w-44px h-44px dark:(text-dark-50 hover:bg-dark-500) hover:(bg-gray-100) flex items-center justify-center rounded-md text-gray-700' +
          (link.label === activeMainLink &&
            'dark:(bg-blue-900 text-blue-400) !hover:(bg-blue-50) !hover:(text-blue-700) bg-blue-50 text-blue-700')
        }
        key={link.label}
      >
        <Icon icon={link.icon} width={24} height={24} />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar width={{ base: 60 }}>
      <Navbar.Section grow className="flex">
        <div className="basis-60px dark:(bg-dark-700 border-r-dark-700) border-r-1 flex flex-shrink-0 flex-grow-0 flex-col items-center border-solid border-r-gray-300 bg-white">
          <div className="w-1/1 h-60px border-b-1 dark:border-b-dark-700 mb-24px pt-16px box-border flex justify-center border-solid border-b-gray-300">
            <Image src="/mantine-small.svg" alt="logo" width={24} height={24} />
          </div>
          {mainLinks}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}

export { MainNavbar as DoubleNavbar };

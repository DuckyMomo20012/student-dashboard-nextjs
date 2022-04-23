import { Navbar, Title } from '@mantine/core';

const SubNavbar = ({ activeMainLink, links, children }) => {
  return (
    <Navbar width={{ base: 200 }}>
      <Navbar.Section grow className="">
        <div className="h-1/1 flex-1 bg-gray-50 dark:bg-gray-600">
          <Title
            order={4}
            className="mb-24px dark:(bg-dark-700 border-b-dark-700) p-16px pt-18px h-60px border-b-1 box-border border-solid border-b-gray-300 bg-white"
          >
            {activeMainLink}
          </Title>

          {links}
        </div>
      </Navbar.Section>
      {children}
    </Navbar>
  );
};

export { SubNavbar };

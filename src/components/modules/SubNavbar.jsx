import { Accordion, Box, Navbar, Text, Title, Tooltip } from '@mantine/core';

const SubNavbar = ({
  heading,
  links,
  children,
  activeSubLink,
  onActiveSubLinkClick,
}) => {
  const accordionItems = links?.map((item) => {
    const { idItem, labelItem, subItemList } = item;
    return (
      // Loop each item then loop subitem
      <Accordion.Item
        className=""
        key={idItem}
        label={<Text className="truncate">{labelItem}</Text>}
      >
        {subItemList?.map(({ idSubItem, labelSubItem }) => {
          return (
            <Tooltip
              className="w-full"
              key={idSubItem}
              label={labelSubItem}
              position="right"
              transitionDuration={0}
              withArrow
            >
              <Text
                className={`border-box dark:(text-dark-50 bg-dark-500 text-white) text-14px leading-11 hover:(bg-gray-100 text-black) block h-11 truncate rounded-r-md px-4 py-0 font-medium text-gray-700 ${
                  activeSubLink === idSubItem &&
                  'dark:(border-l-blue-700 bg-blue-700) !hover:(border-l-blue-500) !hover:(bg-blue-500) !hover:(text-white) border-l-blue-500 bg-blue-500 text-white'
                }`}
                onClick={() => {
                  onActiveSubLinkClick(idSubItem);
                }}
              >
                {labelSubItem}
              </Text>
            </Tooltip>
          );
        })}
      </Accordion.Item>
    );
  });

  return (
    <Navbar width={{ base: 200 }}>
      <Navbar.Section>
        <Title
          className="dark:(bg-dark-700 border-b-dark-700) p-16px pt-18px h-60px border-b-1 box-border border-solid border-b-gray-300 bg-white"
          order={4}
        >
          {heading}
        </Title>
      </Navbar.Section>
      <Navbar.Section className="bg-gray-100 dark:bg-gray-600" grow>
        <Accordion
          className="w-200px"
          disableIconRotation={true}
          iconPosition="right"
          offsetIcon={false}
        >
          {accordionItems}
        </Accordion>
      </Navbar.Section>
      {children}
    </Navbar>
  );
};

export { SubNavbar };

import { Accordion, Navbar, Text, Title, Tooltip } from '@mantine/core';

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
      <Accordion.Item label={labelItem} key={idItem}>
        {subItemList?.map(({ idSubItem, labelSubItem }) => {
          return (
            <Tooltip
              label={labelSubItem}
              position="right"
              withArrow
              transitionDuration={0}
              key={idSubItem}
              className="w-1/1"
            >
              <Text
                className={
                  'border-box dark:(text-dark-50 bg-dark-500 text-white) px-16px text-14px mr-16px h-44px leading-11 hover:(bg-gray-100 text-black) block truncate rounded-tr-md rounded-br-md py-0 font-medium text-gray-700 no-underline' +
                  (activeSubLink === idSubItem &&
                    'dark:(border-l-blue-700 bg-blue-700) !hover:(border-l-blue-500) !hover:(bg-blue-500) !hover:(text-white) border-l-blue-500 bg-blue-500 text-white')
                }
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
      <Navbar.Section grow className="">
        <div className="h-1/1 flex-1 bg-gray-50 dark:bg-gray-600">
          <Title
            order={4}
            className="dark:(bg-dark-700 border-b-dark-700) p-16px pt-18px h-60px border-b-1 box-border border-solid border-b-gray-300 bg-white"
          >
            {heading}
          </Title>

          <Accordion>{accordionItems}</Accordion>
        </div>
      </Navbar.Section>
      {children}
    </Navbar>
  );
};

export { SubNavbar };

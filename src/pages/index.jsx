import {
  Box,
  Button,
  Container,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';

const HeroTitle = () => {
  const theme = useMantineTheme();

  return (
    <Box className="dark:bg-dark-800 relative border">
      <Container className="pt-200px pb-120px <md:py-80px relative" size={700}>
        <Title
          className="text-62px leading-1.1 <md:(text-42px leading-1.2) dark:color-light-50 m-0 bg-transparent p-0 font-black"
          order={1}
        >
          A{' '}
          <Text
            component="span"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
            variant="gradient"
          >
            fully featured
          </Text>{' '}
          Student management dashboard
        </Title>

        <Text className="text-24px <md:text-18px mt-24px" color="dimmed">
          Connect and edit your database seamlessly
        </Text>

        <Group className="mt-48px <md:mt-24px">
          <Link href="/auth/login">
            <Button
              className="h-54px px-38px <md:(h-54px px-18px flex-1)"
              gradient={{ from: 'blue', to: 'cyan' }}
              size="xl"
              variant="gradient"
            >
              Get started
            </Button>
          </Link>

          <Button
            className="h-54px px-38px <md:(h-54px px-18px flex-1) border-dark-900 dark:(border-transparent bg-dark-600 hover:!bg-dark-600) border-2 bg-transparent hover:!bg-gray-50"
            color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            component="a"
            href="https://github.com/DuckyMomo20012/student-dashboard-nextjs"
            size="xl"
            variant="outline"
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </Box>
  );
};

export default HeroTitle;

import { Icon } from '@iconify/react';
import {
  Anchor,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [opened, setOpened] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [user, setUser] = useState(null);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (session) {
      const { user } = session;
      setUser(user);
      if (sessionStatus === 'authenticated') {
        setOpened(true);
        setOverlayVisible(false);
      }
    }
  }, [session]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    setOverlayVisible(true);
    signIn('credentials', { email, password, redirect: false });
  };

  return (
    <Container my={40} size={420}>
      <Title align="center" className="font-black">
        Welcome back!
      </Title>
      <Text align="center" color="dimmed" mt={5} size="sm">
        Do not have an account yet?{' '}
        <Link href="/account/register">
          <Anchor size="sm">Create account</Anchor>
        </Link>
      </Text>

      <Paper
        mt={30}
        p={30}
        radius="md"
        shadow="md"
        withBorder
        className="relative"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...register('email')}
            id="email"
          />
          <PasswordInput
            label="Password"
            mt="md"
            placeholder="Your password"
            required
            {...register('password')}
            id="password"
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>

        <LoadingOverlay visible={overlayVisible} />
      </Paper>

      <Modal
        onClose={() => {
          setOpened(false);
          if (user) {
            const userName = slugify(user.name.toLowerCase());
            router.push(`/${userName}/dashboard`);
          }
        }}
        opened={opened}
        withCloseButton={false}
      >
        {user ? (
          <Group>
            <ThemeIcon color="green" radius="xl" size="xl" variant="light">
              <Icon icon="ic:twotone-check-circle" width={24} />
            </ThemeIcon>
            <Text>You are logged in</Text>
          </Group>
        ) : (
          <Group>
            <ThemeIcon color="red" radius="xl" size="xl" variant="light">
              <Icon icon="ic:baseline-error-outline" width="24" />
            </ThemeIcon>
            <Text>You are not logged in</Text>
          </Group>
        )}
      </Modal>
    </Container>
  );
};

export default Login;

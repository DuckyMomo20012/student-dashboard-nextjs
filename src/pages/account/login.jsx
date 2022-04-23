import { Icon } from '@iconify/react';
import {
  Anchor,
  Button,
  Container,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { setUser } from '@store/slice/userSlice.js';
import axios from 'axios';
import { sha1 } from 'hash-wasm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

async function fetchUsers(userMail) {
  console.log('userMail', userMail);
  const users = await axios.get(`/api/users/${userMail}`);
  return users.data;
}

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [opened, setOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const mutation = useMutation((userMail) => {
    return fetchUsers(userMail);
  });

  const onSubmit = async (data) => {
    const user = await mutation.mutateAsync(data.email);
    const hashPassword = await sha1(data.password);
    if (user.email === data.email && user.password === hashPassword) {
      setIsLoggedIn(true);
      dispatch(setUser(user));
    }
    setOpened(true);
  };

  return (
    <Container my={40} size={420}>
      <Modal
        onClose={() => {
          setOpened(false);
          if (isLoggedIn) router.push('/dashboard');
        }}
        opened={opened}
        withCloseButton={false}
      >
        {isLoggedIn ? (
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
      <Title align="center" className="font-black">
        Welcome back!
      </Title>
      <Text align="center" color="dimmed" mt={5} size="sm">
        Do not have an account yet?{' '}
        <Link href="/account/register">
          <Anchor size="sm">Create account</Anchor>
        </Link>
      </Text>

      <Paper mt={30} p={30} radius="md" shadow="md" withBorder>
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
      </Paper>
    </Container>
  );
};

export default Login;

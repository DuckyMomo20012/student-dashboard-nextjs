import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useForm } from 'react-hook-form';

import Link from 'next/link';
import prisma from '@lib/prisma.js';
// import { getUserAuth } from '@/features/auth/api/getUser.js';

const Login = ({ users }) => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
    console.log(users);
  }

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

      <Paper mt={30} p={30} radius="md" shadow="md" withBorder>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...register('username')}
          />
          <PasswordInput
            label="Password"
            mt="md"
            placeholder="Your password"
            required
            {...register('password')}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export async function getStaticProps() {
  const users = await prisma.staff.findUnique({
    where: {
      id: 'NV01',
    },
    select: { name: true, password: true },
  });
  return {
    users: { users },
  };
}

export default Login;

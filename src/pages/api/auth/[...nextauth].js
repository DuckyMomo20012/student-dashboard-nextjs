import { DOMAIN } from '@constant/index.js';
import axios from 'axios';
import { sha1 } from 'hash-wasm';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function fetchOneUser(userMail) {
  const user = await axios.get(`${DOMAIN}/api/users`, {
    params: {
      usermail: userMail,
    },
  });
  return user.data;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'you@mantine.dev',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        // Inputs from login form
        const { email, password } = credentials;
        const hashPassword = await sha1(password);
        const user = await fetchOneUser(email);
        if (user && user.password === hashPassword) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  events: {
    async signIn(message) {
      const {
        user: { name },
      } = message;
      console.log(`User: ${name} signed in`);
    },
  },
});
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
yarn
```

> If you have error: "node" is incompatible... Then add flag:
> `--ignore-engines`. E.g: `yarn add --ignore-engines PACKAGE_NAME`

Then, generate Prisma client

```bash
npx prisma generate
```

Go to `.env` file to edit connection string

NOTE: Ensure you have enable **TCP/IP** protocol
([Guide](https://www.ibm.com/docs/en/sss/3.1.1?topic=install-enabling-sql-server-express-communication-over-tcpip)), or you can use other
connection string

```
DATABASE_URL="sqlserver://localhost:1433;database=DATABASE;username=USER;password=PASSWORD;trustServerCertificate=true;"
```

## Run server:

Run the development server:

```bash
yarn dev
```

import prisma from '@lib/prisma.js';

async function handle(req, res) {
  const users = await prisma.staff.findUnique({
    where: {
      id: 'NV01',
    },
    select: { name: true, password: true },
  });
  res.json(users);
}

export default handle;

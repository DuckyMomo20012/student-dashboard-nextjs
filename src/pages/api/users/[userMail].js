import prisma from '@lib/prisma.js';

async function handle(req, res) {
  const { userMail } = req.query;
  const user = await prisma.staff.findFirst({
    where: {
      email: userMail,
    },
    select: { email: true, password: true },
  });
  if (user) {
    res.status(200).json({ ...user, password: user.password.toString('hex') });
  } else {
    res.status(404).json({
      status: 'error',
      code: '404',
      message: 'User not found',
    });
  }
}

export default handle;

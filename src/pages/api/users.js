import prisma from '@lib/prisma.js';

async function handle(req, res) {
  const users = await prisma.NHANVIEN.findUnique({
    where: {
      MANV: 'NV01',
    },
    select: { HOTEN: true, MATKHAU: true },
  });
  res.status(200).json({ ...users, MATKHAU: users.MATKHAU.toString('hex') });
}

export default handle;

import prisma from '@lib/prisma.js';

async function getAllCourseOneStaff(req, res) {
  const { user: userId } = req.query;
  const majorCourseList = await prisma.major.findMany({
    where: {
      idStaff: userId,
    },
    select: {
      id: true,
      nameMajor: true,
      courses: {
        select: {
          id: true,
          nameCourse: true,
        },
      },
    },
  });
  res.status(200).json([...majorCourseList]);
}

export default getAllCourseOneStaff;

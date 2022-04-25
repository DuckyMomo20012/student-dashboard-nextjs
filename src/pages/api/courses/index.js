import prisma from '@lib/prisma.js';

async function getAllCourseOneStaff(req, res) {
  const { username } = req.query;
  const majorCourseList = await prisma.major.findMany({
    where: {
      staffs: {
        name: username,
      },
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

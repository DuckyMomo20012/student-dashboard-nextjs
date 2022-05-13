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
      idMajor: true,
      nameMajor: true,
      courses: {
        select: {
          idCourse: true,
          nameCourse: true,
        },
      },
    },
  });
  res.status(200).json([...majorCourseList]);
}

export default getAllCourseOneStaff;

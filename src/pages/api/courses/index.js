import prisma from '@lib/prisma.js';

async function getAllCourse(req, res) {
  const { user: userId } = req.query;
  const courses = await prisma.course.findMany({
    where: {
      id: userId,
    },
    select: {
      id: true,
      nameCourse: true,
    },
  });
  res.status(200).json([...courses]);
}

export default getAllCourse;

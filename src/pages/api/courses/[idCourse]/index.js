import prisma from '@lib/prisma.js';

async function getOneCourse(req, res) {
  const { idCourse } = req.query;
  const course = await prisma.course.findFirst({
    where: { id: idCourse },
  });
  res.status(200).json(course);
}

export default getOneCourse;

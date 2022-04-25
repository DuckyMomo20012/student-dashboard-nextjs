import prisma from '@lib/prisma.js';

async function getAllStudentOneCourse(req, res) {
  const { idCourse } = req.query;
  const students = await prisma.transcript.findMany({
    where: {
      idCourse: idCourse,
    },
    select: {
      student: {
        select: { id: true, name: true, dob: true, address: true },
      },
    },
  });
  res.status(200).json([...students]);
}

export default getAllStudentOneCourse;

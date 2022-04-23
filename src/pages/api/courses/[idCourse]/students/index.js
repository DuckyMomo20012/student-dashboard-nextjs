import prisma from '@lib/prisma.js';

async function getAllCourseStudent(req, res) {
  const { idCourse } = req.query;
  console.log('idCourse', idCourse);
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

export default getAllCourseStudent;

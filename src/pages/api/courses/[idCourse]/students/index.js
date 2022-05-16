import prisma from '@lib/prisma.js';

async function handleAllStudentOneCourse(req, res) {
  const { idCourse } = req.query;
  if (req.method === 'PUT') {
    const { dataStudent } = req.body;
    const updateStudents = await prisma.$transaction(
      dataStudent.map((student) => {
        const { idStudent } = student;
        return prisma.student.update({
          where: {
            idStudent,
          },
          data: {
            ...student,
          },
        });
      }),
    );
    res.status(204);
  }

  const students = await prisma.transcript.findMany({
    where: {
      idCourse,
    },
    select: {
      student: {
        select: { idStudent: true, name: true, dob: true, address: true },
      },
    },
  });
  res.status(200).json([...students]);
}

export default handleAllStudentOneCourse;

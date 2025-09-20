import prisma from "../prisma/prisma.js";

export const createRegisteredSubject = async (registeredSubject) => {
  return await prisma.registeredSubjects.create({
    data: registeredSubject,
  });
};

export const getRegisteredSubjectsByStudentId = async (studentId) => {
  return await prisma.registeredSubjects.findMany({
    where: { student_id: studentId },
  });
};

export const updateGrade = async (studentId, subjectId, grade) => {
  return await prisma.registeredSubjects.updateMany({
    where: { student_id: studentId, subject_id: subjectId },
    data: { grade: grade },
  });
};

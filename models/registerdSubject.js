import prisma from "../prisma/prisma.js";

//สร้างข้อมูลวิชาที่ลงทะเบียนใหม่
export const createRegisteredSubject = async (registeredSubject) => {
  return await prisma.registeredSubjects.create({
    data: registeredSubject,
  });
};

//ดึงข้อมูลวิชาที่ลงทะเบียนทั้งหมด
export const getRegisteredSubjectsByStudentId = async (studentId) => {
  return await prisma.registeredSubjects.findMany({
    where: { student_id: studentId },
  });
};

//update เกรดของวิชาที่ลงทะเบียน
export const updateGrade = async (studentId, subjectId, grade) => {
  return await prisma.registeredSubjects.updateMany({
    where: { student_id: studentId, subject_id: subjectId },
    data: { grade: grade },
  });
};

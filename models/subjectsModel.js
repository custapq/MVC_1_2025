import prisma from "../prisma/prisma.js";

//สร้างข้อมูล subject ใหม่
export const createSubject = async (subject) => {
  return await prisma.subjects.create({
    data: subject,
  });
};

//ดึง subject โดยใช้ subject_id
export const getSubjectById = async (subject_id) => {
  return await prisma.subjects.findUnique({
    where: { subject_id },
  });
}

//ดึง subject โดยใช้ student_id ในวิชาที่ลงทะเบียนแล้ว
export const getAllSubjects = async (student_id) => {
  return await prisma.$queryRaw`
  SELECT s.subject_id,s.subject_name, s.subject_credit, s.subject_teacher, sj.subject_name  subject_requiriste
  FROM subjects s
  LEFT JOIN subjects sj ON s.subject_requiriste_id = sj.subject_id
  LEFT JOIN registeredsubjects rs ON s.subject_id = rs.subject_id
  WHERE rs.student_id = ${student_id}
  `;
};

//ดึง subject โดยใช้ student_id ในวิชาที่ยังไม่ลงทะเบียน
export const getAllNotRegisteredSubjects = async (student_id) => {
  return await prisma.$queryRaw`
  SELECT s.subject_id,s.subject_name, s.subject_credit, s.subject_teacher, sj.subject_name  subject_requiriste,s.subject_credit
  FROM subjects s
  LEFT JOIN subjects sj ON s.subject_requiriste_id = sj.subject_id
  LEFT JOIN registeredsubjects rs ON s.subject_id = rs.subject_id
  WHERE rs.student_id is null
  ORDER BY s.subject_id
  `;
};

//ดึงข้อมูล subject prerequisite ทั้งหมดเพื่อตรวจสอบเงื่อนไขการลงทะเบียน
export const registerSubject = async () => {
  return  await prisma.subjects.findUnique({
            where: { subject_id },
            select: { subject_requiriste_id: true }
        });
}
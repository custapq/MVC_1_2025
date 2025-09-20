import prisma from "../prisma/prisma.js";

export const createSubject = async (subject) => {
  return await prisma.subjects.create({
    data: subject,
  });
};

export const getSubjectById = async (subject_id) => {
  return await prisma.subjects.findUnique({
    where: { subject_id },
  });
}

export const getAllSubjects = async (student_id) => {
  return await prisma.$queryRaw`
  SELECT s.subject_id,s.subject_name, s.subject_credit, s.subject_teacher, sj.subject_name  subject_requiriste
  FROM subjects s
  LEFT JOIN subjects sj ON s.subject_requiriste_id = sj.subject_id
  LEFT JOIN registeredsubjects rs ON s.subject_id = rs.subject_id
  WHERE rs.student_id = ${student_id}
  `;
};

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

export const registerSubject = async () => {
  return  await prisma.subjects.findUnique({
            where: { subject_id },
            select: { subject_requiriste_id: true }
        });
}
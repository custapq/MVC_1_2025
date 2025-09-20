import prisma from "../prisma/prisma.js";

export const getStudent = async (student_id) => {
  return await prisma.students.findUnique({
    where: { student_id }
  });
}
export const getAllStudents = async () => {
  return await prisma.$queryRaw`
SELECT s.student_id,s.student_tile,s.student_name,s.student_surname,
  s.student_birthdate,s.student_age,s.student_school,s.student_email,
  ss.subjectstructure_name,sj.subject_name,rs.grade,rs.subject_id,sj.subject_credit  FROM students s 
  LEFT JOIN registeredsubjects rs ON s.student_id = rs.student_id 
  LEFT JOIN subjects sj ON rs.subject_id = sj.subject_id
  LEFT JOIN subjectStructure ss ON s.student_subjectStructure_id = ss.subjectstructure_code
  `;
};

export const getAllStudentsName = async () => {
  return await prisma.$queryRaw`SELECT student_name FROM students ORDER BY student_name,student_age`;
};

export const getStudentById = async (studentId) => {
  return await prisma.$queryRaw`
  SELECT s.student_id,s.student_tile,s.student_name,s.student_surname,
  s.student_birthdate,s.student_age,s.student_school,s.student_email,
  ss.subjectstructure_name,sj.subject_name,rs.grade,rs.subject_id,sj.subject_credit
  FROM students s 
  LEFT JOIN registeredsubjects rs ON s.student_id = rs.student_id 
  LEFT JOIN subjects sj ON rs.subject_id = sj.subject_id
  LEFT JOIN subjectStructure ss ON s.student_subjectStructure_id = ss.subjectstructure_code
  WHERE s.student_id = ${studentId}
  AND rs.grade IS NOT NULL
  `;
};

export const getStudentDetailById = async (studentId) => {
  return await prisma.$queryRaw`
SELECT s.student_id,s.student_tile,s.student_name,s.student_surname,
  s.student_birthdate,s.student_age,s.student_school,s.student_email,
  ss.subjectstructure_name,sj.subject_name,rs.grade,rs.subject_id  FROM students s 
  LEFT JOIN registeredsubjects rs ON s.student_id = rs.student_id 
  LEFT JOIN subjects sj ON rs.subject_id = sj.subject_id
  LEFT JOIN subjectStructure ss ON s.student_subjectStructure_id = ss.subjectstructure_code
  WHERE s.student_id = ${studentId}
  `;
};

export const createStudent = async (student) => {
  return await prisma.students.create({
    data: student,
  });
};

import prisma from "../prisma/prisma.js";

//สร้าง user เริ่มต้นจาก insert_data.json
export const createUser = async (userData) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

//ดึง user โดยใช้ user_id
export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { user_id: userId },
  });
};

//ดึง user ทั้งหมด
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

//ดึง ADMIN user ทั้งหมด
export const getAllAdminUsers = async () => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'ADMIN'
  `;
};

//ดึง STUDENT user ทั้งหมด
export const getAllStudentUsers = async () => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'STUDENT'
  `;
};

//ดึง ADMIN user โดยใช้ user_name และ user_password
export const getAdminUsersById = async (username, user_password) => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'ADMIN' AND u.user_name = ${username} AND u.user_password = ${user_password}
  `;
};

//ดึง STUDENT user โดยใช้ user_name และ user_password
export const getStudentUsersById = async (username, user_password) => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'STUDENT' AND u.user_name = ${username} AND u.user_password = ${user_password}
  `;
};

import prisma from "../prisma/prisma.js";

export const createUser = async (userData) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { user_id: userId },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getAllAdminUsers = async () => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'ADMIN'
  `;
};

export const getAllStudentUsers = async () => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'STUDENT'
  `;
};

export const getAdminUsersById = async (username, user_password) => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'ADMIN' AND u.user_name = ${username} AND u.user_password = ${user_password}
  `;
};

export const getStudentUsersById = async (username, user_password) => {
  return await prisma.$queryRaw`
    SELECT *
    FROM User u
    WHERE UPPER(u.user_role) = 'STUDENT' AND u.user_name = ${username} AND u.user_password = ${user_password}
  `;
};

import prisma from "../prisma/prisma.js";

export const createSubjectStructure = async (subjectStructure) => {
  return await prisma.subjectStructure.create({
    data: subjectStructure,
  });
};

export const getAllSubjectStructures = async () => {
  return await prisma.subjectStructure.findMany();
};

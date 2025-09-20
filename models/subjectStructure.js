import prisma from "../prisma/prisma.js";

//สร้างข้อมูล subject structure 
export const createSubjectStructure = async (subjectStructure) => {
  return await prisma.subjectStructure.create({
    data: subjectStructure,
  });
};

//ดึง subjectstructure ทั้งหมด
export const getAllSubjectStructures = async () => {
  return await prisma.subjectStructure.findMany();
};

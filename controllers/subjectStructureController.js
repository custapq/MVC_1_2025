import {
  createSubjectStructure,
  getAllSubjectStructures,
} from "../models/subjectStructure.js";

//สร้าง subject structure ใหม่พร้อมตรวจสอบรูปแบบรหัสหลักสูตร
export const addSubjectStructure = async (req, res) => {
  try {
    const {
      subjectstructure_id,
      subjectstructure_name,
      subjectstructure_department_name,
      subject_require_id,
      subjectstructure_term,
    } = req.body;
    console.log(req.body);
    if (!validateId(subjectstructure_id)) {
      return res
        .status(400)
        .json({ error: "รูปแบบรหัสโครงสร้างหลักสูตรไม่ถูกต้อง" });
    }
    const newSubjectStructure = await createSubjectStructure({
      subjectstructure_id,
      subjectstructure_name,
      subjectstructure_department_name,
      subject_require_id,
      subjectstructure_term,
    });
    console.log(newSubjectStructure);
    res.status(201).json(newSubjectStructure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in addSubjectStructure controller" });
  }
};

//ดึง subject structure ทั้งหมด
export const getAllSubjectStructure = async (req, res) => {
  try {
    const subjectStructures = await getAllSubjectStructures();
    res.status(200).json(subjectStructures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in getAllSubjectStructure" });
  }
};

//ตรวจสอบรูปแบบรหัสหลักสูตร 
const validateId = (id) => {
  const subjectStructureIdRegex = /^[1-9][0-9]{7}$/; // 8 หลัก ตัวแรกไม่ใช่ 0
  return subjectStructureIdRegex.test(id);
};

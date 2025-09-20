import { createSubject,getAllSubjects,getAllNotRegisteredSubjects } from "../models/subjectsModel.js";

//สร้าง subject ใหม่พร้อมการตรวจสอบรูปแบบรหัสวิชา
export const addSubject = async (req, res) => {
  try {
    const {
      subject_id,
      subject_name,
      subject_credit,
      subject_teacher,
      subject_requiriste_id,
    } = req.body;
    console.log(req.body);
    if (!validateId(subject_id)) {
      return res.status(400).json({ error: "รูปแบบรหัสวิชาไม่ถูกต้อง" });
    }
    const newSubject = await createSubject({
      subject_id,
      subject_name,
      subject_credit,
      subject_teacher,
      subject_requiriste_id,
    });
    console.log(newSubject);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: "error in addSubject controller" });
  }
};

//ดึง subject ทั้งหมด
export const getAllSubject = async (req, res) => {
    try {
        const { student_id } = req.params;
        const subjects = await getAllSubjects();
        res.status(200).json(subjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error in getAllSubject" });
    }
};

//ดึง subject ที่ยังไม่ลงทะเบียน
export const getAllNotRegisteredSubject = async (req, res) => {
    try {
        const { student_id } = req.params;
        const subjects = await getAllNotRegisteredSubjects(student_id);
        res.status(200).json(subjects);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error in getAllNotRegisteredSubject" });
    }
};

//ตรวจสอบรูปแบบรหัสวิชา
const validateId = (id) => {
  const studentIdRegex = /^(0550|9069)\d{4}$/; // 8 หลัก ขึ้นต้นด้วย 0550 หรือ 9069
  return studentIdRegex.test(id);
};

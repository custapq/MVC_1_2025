import {
  createStudent,
  getStudentById,
  getStudentDetailById,
  getAllStudents,
  
} from "../models/studentModel.js";

//สร้าง student ใหม่ พร้อมการตรวจสอบอายุและรูปแบบรหัสนักเรียน
export const createStudentController = async (req, res) => {
  const {
    student_id,
    student_tile,
    student_name,
    student_surname,
    student_birthdate,
    student_school,
    student_email,
    student_subjectStructure_id,
    student_user_id
  } = req.body;

  const age = calculateAge(student_birthdate);
  if (age < 15) {
    return res.status(400).json({ error: "อายุต่ำกว่าเกณฑ์" });
  }
  if (!validateId(student_id)) {
    return res.status(400).json({ error: "รูปแบบรหัสนักเรียนไม่ถูกต้อง" });
  }
  const newStudent = await createStudent({
    student_id,
    student_tile,
    student_name,
    student_surname,
    student_birthdate,
    student_age : age,
    student_school,
    student_email,
    student_subjectStructure_id,
    student_user_id
  });
  console.log(newStudent);
  res.status(201).json(newStudent);
};

//ดึง student โดยใช้ student_id 
export const getStudentDetail = async (req, res) => {
  const { id } = req.params;
  const student = await getStudentById(id);
  res.status(200).json(student);
};

//ดึง student โดยใช้ student_id เพื่อแสดงผลใน ADMIN
export const getStudentDetailAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await getStudentDetailById(id);
        if (student.length === 0) {
            return res.status(404).json({ error: "student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error in getStudentDetailAdmin" });
    }
};

//ดึง student ทั้งหมด
export const getAllStudent = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in getAllStudent" });
  }
};

//คำนวณอายุ
const calculateAge = (birthdate) => {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};
//ตรวจสอบรูปแบบรหัสนักเรียน
const validateId = (id) => {
  const studentIdRegex = /^(69)\d{6}$/; // 8 หลัก ขึ้นต้นด้วย 69
  return studentIdRegex.test(id);
};

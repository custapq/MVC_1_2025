import prisma from "../prisma/prisma.js";
import {
  createRegisteredSubject,
  getRegisteredSubjectsByStudentId,
  updateGrade,
} from "../models/registerdSubject.js";
import {getStudent} from "../models/studentModel.js";
import {getSubjectById} from "../models/subjectsModel.js";

//ลงทะเบียนวิชาใหม่
export const registeredSubject = async (req, res) => {
  try {
    const { student_id, subject_id, grade } = req.body;
    const newRegisteredSubject = await createRegisteredSubject({
      student_id,
      subject_id,
      grade,
    });
    res.status(201).json(newRegisteredSubject);
  } catch (error) {
    res.status(500).json({ error: "error in registeredSubject" });
  }
};

//ลงทะเบียนวิชา พร้อมตรวจสอบเงื่อนไขที่ต้องใช้ในการลงทะเบียรน
export const registerSubject = async (req, res) => {
  try {
    const { student_id, subject_id } = req.body;
    const student = await getStudent(student_id);
    if (!student) {
      return res.status(404).json({ error: "student not found" });
    }
    const subject = await prisma.subjects.findUnique({
      where: { subject_id },
      select: { subject_requiriste_id: true },
    });
    if (!subject) {
      return res.status(404).json({ error: "subject not found" });
    }
    // ตรวจสอบว่ามีวิชาที่ต้องเรียนก่อนหรือไม่
    if (subject.subject_requiriste_id) {
      const prerequisiteSubjectId = subject.subject_requiriste_id;
      //ดึงข้อมูลการลงทะเบียนวิชาที่ต้องเรียนก่อน
      const prerequisiteRegistration =
        await prisma.registeredSubjects.findFirst({
          where: {
            student_id,
            subject_id: prerequisiteSubjectId,
          },
        });
      if (!prerequisiteRegistration || !prerequisiteRegistration.grade) {
        return res
          .status(400)
          .json({
            error: `ต้องผ่านวิชา ${prerequisiteSubjectId} ก่อนลงทะเบียนวิชานี้.`,
          });
      }
    }
    const newRegisteredSubject = await createRegisteredSubject({
      grade: null,
      student: {
        connect: { student_id },
      },
      subject: { connect: { subject_id } },
    });

    res.status(201).json(newRegisteredSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in registerSubject" });
  }
};

export const changeGrade = async (req, res) => {
  const { student_id, subject_id, grade } = req.body;
  const validGrades = ["A", "B+", "B", "C+", "C", "D+", "D", "F", null, ""];
  // ตรวจสอบว่าเกรดที่ส่งมาถูกต้องหรือไม่
  if (!validGrades.includes(grade.toUpperCase())) {
    return res
      .status(400)
      .json({
        error: `ใส่เกรดให้ถูก: ${validGrades.join(", ")}`,
      });
  }

  try {
    const updatedRegisteredSubject = await updateGrade(
      student_id,
      subject_id,
      grade.toUpperCase()
    );
    if (updatedRegisteredSubject.count === 0) {
      return res
        .status(404)
        .json({ error: "student or subject not found, or grade not updated" });
    }
    res.status(200).json({ message: "แก้ไขเกรดเรียบร้อย" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in changeGrade" });
  }
};


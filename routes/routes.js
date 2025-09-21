import express from "express";
import {registeredSubject, registerSubject, changeGrade} from "../controllers/registeredSubjectController.js";
import {createStudentController,getStudentDetail,getStudentDetailAdmin,getAllStudent} from "../controllers/studentsController.js";
import {addSubject,getAllSubject,getAllNotRegisteredSubject} from "../controllers/subjectsController.js";
import {registerUser, loginUserAdmin, loginUserStudent,getAllUers} from "../controllers/userController.js";
import {addSubjectStructure, getAllSubjectStructure} from "../controllers/subjectStructureController.js";

const router = express.Router();

//api ในการจัดการการลงทะเบียนวิชา
router.post("/register", registeredSubject); // insert ข้อมูลการลงทะเบียนวิชา
router.post("/registerSubject", registerSubject); // ลงทะเบียนวิชาของนักเรียน
router.put("/updateGrade", changeGrade); // update เกรดของนักเรียน

//api ในการจัดการ student
router.post("/students", createStudentController); // insert ข้อมูลนักเรียน
router.get("/students", getAllStudent); // ดึงข้อมูลนักเรียนทั้งหมด
router.get("/students/:id", getStudentDetail); // ดึงข้อมูลนักเรียนโดยใช้ student_id
router.get("/students/admin/:id", getStudentDetailAdmin); // ดึงข้อมูลนักเรียนโดยใช้ student_id เพื่อแสดงผลใน ADMIN

//api ในการจัดการ subject
router.post("/subjects", addSubject); // insert ข้อมูลรายวิชา
router.get("/subjects/:student_id", getAllSubject);     // ดึงข้อมูลรายวิชาทั้งหมดของนักเรียนคนนั้นๆ
router.get("/subjects/notRegistered/:student_id", getAllNotRegisteredSubject); // ดึงข้อมูลรายวิชาที่ยังไม่ลงทะเบียนของนักเรียนคนนั้นๆ
//api ในการจัดการ user
router.post("/users/register", registerUser); // insert ข้อมูล user ใหม่
router.post("/users/login/admin", loginUserAdmin); // login user admin
router.post("/users/login/student", loginUserStudent); // login user student
router.get("/users", getAllUers); // ดึงข้อมูล user ทั้งหมด

//api ในการจัดการ subject structure
router.post("/subjectStructures", addSubjectStructure); // insert ข้อมูลโครงสร้างรายวิชา
router.get("/subjectStructures", getAllSubjectStructure); // ดึงข้อมูลโครงสร้างรายวิชาทั้งหมด

//view rendering
router.get("/", (req, res) => {
    res.render("login", { pageTitle: "Login" });
});
router.get("/admin/:id", (req, res) => {
    res.render("admin", { pageTitle: "Admin" });
});
router.get("/admin/:id/student/:student_id", (req, res) => {
    res.render("admin_student", { pageTitle: "Admin Edit" });
});
router.get("/student/:id", (req, res) => {
    res.render("student", { pageTitle: "Student" });
});
export default router;

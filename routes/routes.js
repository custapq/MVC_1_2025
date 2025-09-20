import express from "express";
import {registeredSubject, registerSubject, changeGrade} from "../controllers/registeredSubjectController.js";
import {createStudentController,getStudentDetail,getStudentDetailAdmin,getAllStudent} from "../controllers/studentsController.js";
import {addSubject,getAllSubject,getAllNotRegisteredSubject} from "../controllers/subjectsController.js";
import {registerUser, loginUserAdmin, loginUserStudent,getAllUers} from "../controllers/userController.js";
import {addSubjectStructure, getAllSubjectStructure} from "../controllers/subjectStructureController.js";

const router = express.Router();

//api
router.post("/register", registeredSubject);
router.post("/registerSubject", registerSubject);
router.put("/updateGrade", changeGrade);

router.post("/students", createStudentController);
router.get("/students", getAllStudent);
router.get("/students/:id", getStudentDetail);
router.get("/students/admin/:id", getStudentDetailAdmin);

router.post("/subjects", addSubject);
router.get("/subjects/:student_id", getAllSubject);
router.get("/subjects/notRegistered/:student_id", getAllNotRegisteredSubject);

router.post("/users/register", registerUser);
router.post("/users/login/admin", loginUserAdmin);
router.post("/users/login/student", loginUserStudent);
router.get("/users", getAllUers);

router.post("/subjectStructures", addSubjectStructure);
router.get("/subjectStructures", getAllSubjectStructure);

//view
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

import express from "express";
import { handlerCreatStudent } from "../controllers/student.js";
import { handlerGetStudent } from "../controllers/student.js";
import { handlerGetStudentByUSN } from "../controllers/student.js";
import { handlerUpdateStudent } from "../controllers/student.js";
import { handlerDeleteStudent } from "../controllers/student.js";

const router = express.Router();

// add student to Database
router.post("/", handlerCreatStudent);

//get allstudent
router.get("/", handlerGetStudent);

//get student by USN
router.get("/:USN", handlerGetStudentByUSN);

//update the students details
router.patch("/:USN", handlerUpdateStudent);

//delete student from database
handlerDeleteStudent;
router.delete("/:USN", handlerDeleteStudent);

export default router;

import { deleteCourse, getAllCourses, getCourseDetails } from "../Controller/courseController.js";
import { getProfile, loginUser, logout, signUp, } from "../Controller/userController.js";
import { Router } from "express";

const router = Router();

router.post('/sign-up', signUp);

router.post('/login', loginUser)

router.get('/profile', getProfile)

router.post('/logout', logout)


export default router;

import { Router } from "express";
import { isAdmin } from "../admin/Admin.js";
import {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseDetails
} from "../Controller/courseController.js";

const router = Router()


router.post('/add-course', isAdmin, createCourse);


router.get('/courses', getAllCourses)


router.route('/course/:id')
    .get(getCourseDetails)
    .delete(deleteCourse)
    .put(updateCourse)


export default router;
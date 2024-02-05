import { Course } from "../models/courseModel.js"
import asyncHandler from "../utils/asyncHandler.js";


export const getAllCourses = asyncHandler(async (req, res, next) => {
    try {
        const courses = await Course.find()
        return res.status(200).json({ status: "success", courses })
    } catch (error) {
        next(error)
    }
})


export const getCourseDetails = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const courseDetails = await Course.findById(id)
        return res.status(200).json({ status: "success", courseDetails })
    } catch (error) {
        next(error) 
    }
})


export const createCourse = asyncHandler(async (req, res, next) => {
    const { title, price, description, user } = req.body;

    try {
        const createCourse = await Course.create({ title, price, description, user });
        console.log(createCourse);
        return res.status(201).json({ status: "success", course: createCourse });
    } catch (error) {
        next(error)
        return res.status(500).json({ msg: "Course creation problem" });
    }
});


export const deleteCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleteCourse = await Course.deleteOne({ id })
        return res.status(201).json({ status: "success", msg: "course deleted successfully" });
    } catch (error) {
        next(error)
    }
})


export const updateCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        let updateCourse = await Course.findById(id)

        updateCourse = await Course.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        return res.status(201).json({ status: "success", msg: "course deleted successfully" });
    } catch (error) {
        next(error)
    }
})


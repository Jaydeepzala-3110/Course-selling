import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CourseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, "It's a required field."]
    },
    description: {
        type: String,
        required: [true, "It's a required field."]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    } ,
    // img: {p

    // }
})

const Course = model('Course', CourseSchema)

export { Course }

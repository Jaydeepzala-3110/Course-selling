import mongoose from "mongoose"
const { Schema } = mongoose;


/*
 * A Mongoose model is a wrapper of the Mongoose schema.
   A Mongoose schema defines the document's properties, default values, 
   types of data, validators, etc. In contrast, a Mongoose model
   provides an interface for the database to create, query, update,
   delete records, and so on. 
 */

const userSchema = new Schema({

  username: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have more than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin',
  },

})


const User = mongoose.model('User', userSchema)

export { User }

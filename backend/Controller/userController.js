import bcrypt from 'bcryptjs'
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/userModel.js';
import jwt, { decode } from "jsonwebtoken"
import auth from "../authMiddlware.js"


export const signUp = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'email, password, and name are required for signup' });
        }

        const existinguser = await User.findOne({ email })

        if (existinguser) {
            return res.status(403).json({ msg: "email is already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword })

        return res.status(201).json({
            status: "success",
            msg: "register successfully",
            user
        });

    } catch (error) {
        console.error('Error during signup:', error);
        next(error)
    }
})



export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({
                error: "email and password are required for login."
            });
            return;
        }

        const user = await User.findOne({ email }).select('+password')
        if (user) {
            const comparePass = await bcrypt.compare(password, user.password)

            if (comparePass) {
                const token = jwt.sign({
                    id: user.id,
                }, process.env.JWT_SECRET);

                res.status(201).cookie("token", token).json({ token: token, msg: "Login successfully", user: user.username })
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Passwords do not match'
                });
            }
        } else {
            return res.status(401).json({ msg: "email not found" });
        }

    } catch (error) {
        res.status(500).json({ error: 'login  Error' });
        return next(error)
    }
})


export const getProfile = asyncHandler(async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ msg: "User not found" });
        }

        const token = authorizationHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: "Fail" });
            }
            const { username } = await User.findById(decoded.id);
            console.log(username);
            return res.status(201).json({ status: "success", username });
        });
    } catch (error) {
        next(error);
    }
});



export const removeUser = asyncHandler(async () => {

    try {
        const { id } = req.body;
        const removeuser = await User.deleteOne(id)
        return res.status(201).json({ status: "Sucess" })
    } catch (error) {
        return res.json()
    }
})


export const logout = asyncHandler(auth, async (req, res, next) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
        res.status(401).json({ message: "Error in logout" });
        next(error)
    }
})

export const forgetPass = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;

        const userEmail = await User.findOne({ email })

        if (!userEmail) {
            return res.status(404).json({ status: "false", msg: "Email is not found" })
        } else {

        }

    } catch (error) {
        next(error)
    }
})




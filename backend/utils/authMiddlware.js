import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/userModel.js';

async function auth(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ msg: "User not found" });
    }

    const token = authorizationHeader.split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded && decoded.id) {
        const user = await User.findById(decoded.id)
        req.user = user
        next()
    } else {
        return res.status(403).json({ msg: "Incorrect token" });
    }
}


export default auth;

import auth from '../utils/authMiddlware.js';
import asyncHandler from '../utils/asyncHandler.js';

export const isAdmin = asyncHandler(auth, async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            console.log(req.user.role);
            return next()
        }
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
});




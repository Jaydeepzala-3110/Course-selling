import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        if (error instanceof mongoose.Error) {
            console.error('MongoDB Error:', error.message);
        } else {
            console.error('Unknown Error:', error);
        }
        process.exit(1);
    }
};

export { connectDB };
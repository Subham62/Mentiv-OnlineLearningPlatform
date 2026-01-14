import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import courseProgressRoute from './routes/courseProgress.route.js';
import instructorRoute from './routes/instructor.route.js'

dotenv.config();

// call database connection 
connectDB();

const app = express();
// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: "http://localhost:5173",
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/media', mediaRoute);
app.use('/api/v1/purchase', purchaseRoute);
app.use('/api/v1/progress', courseProgressRoute);
// Add with other routes
app.use("/api/v1/instructor", instructorRoute);

// app.post("/home", (req, res) => {
//     res.status(200).json({message: "hello everything secured"});
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`);
});
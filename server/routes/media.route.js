import express from "express";
const router = express.Router();
import upload from "../utils/multer.js";
import { deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";

router.route("/upload-video/:lectureId").post(upload.single("file"), async (req, res) => {
  try {
    // if lecture present in cloudinary then remove this and then upload new one
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    const result = await uploadMedia(req.file.path);
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: "Error in uploading file" });
  }
});

export default router;

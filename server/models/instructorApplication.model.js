import mongoose from "mongoose";

const instructorApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    expertise: { type: String, required: true },
    experience: { type: String, required: true },
    why: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved"],
      default: "approved", // Always approved
    },
  },
  { timestamps: true }
);

export const InstructorApplication = mongoose.model(
  "InstructorApplication",
  instructorApplicationSchema
);

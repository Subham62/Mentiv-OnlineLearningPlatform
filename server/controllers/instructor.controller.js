import { InstructorApplication } from "../models/instructorApplication.model.js";
import { User } from "../models/user.model.js";

// Apply to become an instructor - AUTO APPROVED
export const applyToBeInstructor = async (req, res) => {
  try {
    const userId = req.id; // From auth middleware
    const { fullName, email, phoneNumber, expertise, experience, why } = req.body;

    // Validation
    if (!fullName || !email || !phoneNumber || !expertise || !experience || !why) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is already an instructor
    if (user.role === "instructor") {
      return res.status(400).json({
        success: false,
        message: "You are already an instructor",
      });
    }

    // Check if user has already applied
    const existingApplication = await InstructorApplication.findOne({ userId });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You are already an instructor",
      });
    }

    // Create application record (for analytics/history)
    await InstructorApplication.create({
      userId,
      fullName,
      email,
      phoneNumber,
      expertise,
      experience,
      why,
      status: "approved", // Auto-approved
    });

    // INSTANTLY update user role to instructor
    user.role = "instructor";
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Congratulations! You are now an instructor. Start creating your first course!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error applying to be instructor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user's instructor status
export const getInstructorStatus = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("role");
    const application = await InstructorApplication.findOne({ userId });

    return res.status(200).json({
      success: true,
      isInstructor: user.role === "instructor",
      application,
    });
  } catch (error) {
    console.error("Error fetching instructor status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

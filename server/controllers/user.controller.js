import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import generateCode from "../utils/generateCode.js";
import sendEmail from "../utils/sendEmail.js";

export const register = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully."
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            });
        }
        generateToken(res, user, `welcome back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully .",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}

// getUserProfile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if(!user){
            return res.status(404).json({
                message: "Profile not found",
                success: false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to load user"
             
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;
        // console.log( req.body);

        const user = await User.findById(userId);
        // return res.json({profilePhoto, photoUrl: user.photoUrl});

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // extract public Id of the old image from url if it exists
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        // return res.json({cloudResponse})
        const photoUrl = cloudResponse.secure_url;

        const updateData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true}).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            // message: "Failed to update profie"
            message: error.message
        })
    }
}

// Send forgot password code
export const forgotPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset code has been sent",
      });
    }

    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();

    // Send email
    await sendEmail({
      emailTo: user.email,
      subject: "Password Reset Code",
      code,
      content: "reset your password",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset code sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send reset code",
    });
  }
};

// Verify code and reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (code !== user.forgotPasswordCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

// Change password for authenticated users
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.id;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

// Optional: Get only students (exclude instructors)
export const getTotalStudents = async (req, res) => {
  try {
    const totalStudents = await User.find({ role: "student" });
    const totalStudentsCount = totalStudents.length;
    return res.status(200).json({
      success: true,
      // totalStudents: totalStudents.length,
      totalStudentsCount
    });
  } catch (error) {
    console.error("Error getting total students:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get total students",
    });
  }
};
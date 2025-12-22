import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle && !category) {
      return res.status(400).json({
        message: "Course title and Category is required",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: "Course created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        message: "Courses not found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get published course",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Courses not found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    console.log("hello");

    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      // delete old one if it exists
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      // upload a thumbnail on cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
      message: "Failed to edit course",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
      message: "Failed to get course by Id",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required",
      });
    }

    // create lecture
    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const editLecture = async (req, res) => {
  console.log("editLectureController");

  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    // console.log(lecture);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    // upload lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    // ---
    if (lecture.videoUrl) {
      if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    } else {
      return res.status(400).json({
        message: "video is required",
      });
    }
    // ---

    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    // if(isPreviewFree)   lecture.isPreviewFree = isPreviewFree;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the course still has the lecture id if it was not add it
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error: error,
      message: "Failed to edit lectures",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    // delete the lecture from cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // Remove the lecture refrences from the associated course
    await Course.updateOne(
      { lectures: lectureId }, //  find the course that contains the lecture
      { $pull: { lectures: lectureId } } //  Remove the lecture id from lectures array
    );

    return res.status(200).json({
      message: "Lecture removed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lectures",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
};

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    // publish status based on the query parameter
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};

// search course
export const searchCourse = async (req, res) => {
  try {
    const { query = "", sortByPrice = "" } = req.query;
    const categories = req.query.categories
      ? req.query.categories.split(",")
      : [];
    // create searchCriteria
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    //  Category filter - matches ANY selected category in the category field
    // if categories selected
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }

    //     In this case:

    // MongoDB matches only courses that satisfy "both" conditions:

    // 1. One of the $or conditions (e.g. title or subtitle matches the search query), AND

    // 2. The category is in ["html", "css"]

    // So if your query is "react" and you selected categories ["html", "css"], but your react course has category "react" (not in that list) — it won’t show.

    // ---------------------------------------------------------------

    // const searchCriteria = {
    //   isPublished: true,
    // };

    // if (query) {
    //   searchCriteria.$or = [
    //     { courseTitle: { $regex: query, $options: "i" } },
    //     { subTitle: { $regex: query, $options: "i" } },
    //     { category: { $regex: query, $options: "i" } },
    //   ];
    // }

    // if (categories.length > 0) {
    //   searchCriteria.category = { $in: categories };
    // }
    // “If query is unmatched but category is valid, why does it still show 'course not found'?”
    // Ans: ->

    // This behaves like:
    // isPublished === true
    // AND (courseTitle OR subTitle OR category matches `query`)
    // AND (category in selected list)

    // This means if the search query doesn't match, even if the category is valid, the course will not show.

    // -----------------------------------------------------------------------------
    

    // define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //  sort by price in ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; //  descending
    }

    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// The search bar should be flexible (checking all fields), but category filters should be precise (only checking the category field)

export const totalCourses = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
    if (!courses) {
      return res.status(404).json({
        message: "Courses not found",
      });
    }
    const totalPublishedCourses = courses.length;
    
    return res.status(200).json({
      totalPublishedCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get total published course",
    });
  }
};
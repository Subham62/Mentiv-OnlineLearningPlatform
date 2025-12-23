import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/config/courseCategories";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);
  const [publishCourse] = usePublishCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });

      // Set existing thumbnail preview
      if (course.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      }
    }
  }, [courseByIdData]);

  const [editCourse, { data, isSuccess, isError, error, isLoading }] =
    useEditCourseMutation();

  //   for input(type=text) tags
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  //   for select tags
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  //   get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  // fileReader.onloadend = ... sets up a callback — what should happen after reading is done.

  // fileReader.readAsDataURL(file) kicks off the async file reading.

  // 	If you call readAsDataURL() before setting onloadend, your callback might never get called because the reading could finish before the handler is attached

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");      //  custom error message
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course. Try again.");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading)
    return (
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-8">
        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-MentivPurple" />
      </div>
    );

  return (
    <Card className="mx-4 sm:mx-6 lg:mx-0 w-full lg:max-w-6xl xl:max-w-7xl">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="w-full sm:w-auto">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl">Basic Course Information</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Make changes to your course here. Click save when you are done.
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
          <Button
            variant="outline"
            disabled={courseByIdData?.course.lectures.length === 0}
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
            className={
              courseByIdData?.course.isPublished
                ? "border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950 dark:border-orange-400 dark:text-orange-400 w-full sm:w-auto"
                : "border-green-500 text-green-600 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950 dark:border-green-400 dark:text-green-400 w-full sm:w-auto"
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive" className="gap-2 w-full sm:w-auto">
            <Trash2 className="h-4 w-4" />
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Course Title */}
        <div className="space-y-2">
          <Label htmlFor="courseTitle" className="text-sm sm:text-base">Course Title *</Label>
          <Input
            id="courseTitle"
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Complete Web Development Bootcamp"
            className="text-sm sm:text-base h-11 sm:h-12"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="subTitle" className="text-sm sm:text-base">Subtitle *</Label>
          <Input
            id="subTitle"
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a full-stack developer from zero to hero in 3 months"
            className="text-sm sm:text-base h-11 sm:h-12"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Description *</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        {/* Category, Level, and Price Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm sm:text-base">Category *</Label>
            <Select value={input.category} onValueChange={selectCategory}>
              <SelectTrigger id="category" className="h-11 sm:h-12 text-sm sm:text-base">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Categories</SelectLabel>
                  {COURSE_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Course Level */}
          <div className="space-y-2">
            <Label htmlFor="courseLevel" className="text-sm sm:text-base">Course Level *</Label>
            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
              <SelectTrigger id="courseLevel" className="h-11 sm:h-12 text-sm sm:text-base">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Difficulty Level</SelectLabel>
                  {COURSE_LEVELS.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="coursePrice" className="text-sm sm:text-base">Price (INR) *</Label>
            <Input
              id="coursePrice"
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="999"
              min="0"
              className="text-sm sm:text-base h-11 sm:h-12"
              required
            />
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="space-y-2">
          <Label htmlFor="thumbnail" className="text-sm sm:text-base">Course Thumbnail *</Label>
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={selectThumbnail}
            className="cursor-pointer w-full sm:w-fit text-sm"
          />
          {previewThumbnail && (
            <div className="mt-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Preview:
              </p>
              <img
                src={previewThumbnail}
                className="w-full sm:w-64 h-32 sm:h-36 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 max-w-full"
                alt="Course Thumbnail Preview"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/course")}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={updateCourseHandler}
            className="bg-MentivPurple hover:bg-MentivPurple/90 w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
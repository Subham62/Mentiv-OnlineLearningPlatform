import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTittle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  // const isLoading = false;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Course created.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to create course.");
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-900 min-h-screen">
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Lets add lectures, add some basic details for your new lectures
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Add and manage lectures for your course
        </p>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Title</Label>
          <Input
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTittle(e.target.value)}
            placeholder="Your title Name"
            className="h-11 sm:h-12 text-sm sm:text-base"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
            className="w-full sm:w-auto"
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        
        <div className="mt-8 sm:mt-10">
          {lectureLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Loading lectures...</p>
            </div>
          ) : lectureError ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm sm:text-base text-destructive">Failed to load lectures</p>
            </div>
          ) : lectureData?.lectures?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">No lectures available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lectureData?.lectures?.map((lecture, index) => (
                <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;

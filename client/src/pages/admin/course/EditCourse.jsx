import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-200 dark:hover:bg-slate-800 h-10 w-10 sm:h-12 sm:w-12"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Edit Course
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              Add detailed information about your course
            </p>
          </div>
        </div>
        <Link to="lecture">
          <Button className="bg-MentivPurple hover:bg-MentivPurple/90 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto px-6 sm:px-8">
            <BookOpen className="h-4 w-4 mr-2" />
            Go to Lectures
          </Button>
        </Link>
      </div>

      {/* Course Tab Content */}
      <CourseTab />
    </div>
  );
};

export default EditCourse;
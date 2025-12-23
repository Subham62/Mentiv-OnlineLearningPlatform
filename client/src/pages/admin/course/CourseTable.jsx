import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Plus, BookOpen, TrendingUp } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCreatorCourseQuery(); // Add error for debugging

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-900 min-h-screen">
        <div className="animate-pulse space-y-4 sm:space-y-6">
          <div className="h-16 sm:h-24 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 sm:h-24 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
            ))}
          </div>
          <div className="h-80 sm:h-96 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Debug: Log data to check if query works
  console.log("CourseTable data:", data);
  console.log("CourseTable error:", error);

  const courses = data?.courses || [];
  const totalCourses = courses.length;
  const publishedCourses = courses.filter((c) => c.isPublished).length;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Manage and organize your courses ({totalCourses} total)
          </p>
        </div>
        <Button
          onClick={() => navigate("create")}
          className="bg-MentivPurple hover:bg-MentivPurple/90 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg bg-MentivPurple/10 dark:bg-MentivPurple/20">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-MentivPurple" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{totalCourses}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{publishedCourses}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow-lg overflow-hidden">
        <Table>
          <TableCaption className="py-3 sm:py-4 text-xs sm:text-sm">
            {courses.length === 0 ? "No courses yet. Create your first course!" : `A list of your ${courses.length} courses`}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800">
              <TableHead className="font-semibold text-xs sm:text-sm">Title</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm">Price</TableHead>
              <TableHead className="font-semibold text-xs sm:text-sm">Status</TableHead>
              <TableHead className="text-right font-semibold text-xs sm:text-sm">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 sm:py-12">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-full bg-gray-100 dark:bg-slate-800">
                      <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">No courses yet</p>
                      <Button
                        onClick={() => navigate("create")}
                        className="bg-MentivPurple hover:bg-MentivPurple/90 w-full sm:w-auto px-6"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Course
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow
                  key={course._id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white text-sm">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-MentivPurple/20 to-MentivPurple/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-MentivPurple" />
                      </div>
                      <span className="max-w-xs sm:max-w-md truncate text-xs sm:text-sm">{course.courseTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">
                    {course?.coursePrice ? `₹${course.coursePrice.toLocaleString()}` : "Free"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        course.isPublished
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm"
                          : "bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm"
                      }
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`${course._id}`)}
                      className="hover:bg-MentivPurple hover:text-white transition-colors h-8 px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CourseTable;
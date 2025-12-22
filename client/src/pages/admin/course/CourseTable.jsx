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
  const { data, isLoading } = useGetCreatorCourseQuery();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
        <div className="animate-pulse space-y-6">
          <div className="h-24 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const courses = data?.courses || [];
  const totalCourses = courses.length;
  const publishedCourses = courses.filter((c) => c.isPublished).length;

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and organize your courses
          </p>
        </div>
        <Button
          onClick={() => navigate("create")}
          className="bg-MentivPurple hover:bg-MentivPurple/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-MentivPurple/10 dark:bg-MentivPurple/20">
              <BookOpen className="h-6 w-6 text-MentivPurple" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCourses}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20">
              <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{publishedCourses}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow-lg overflow-hidden">
        <Table>
          <TableCaption className="py-4">
            {courses.length === 0 ? "No courses yet. Create your first course!" : "A list of your courses"}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800">
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-gray-100 dark:bg-slate-800">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">No courses yet</p>
                      <Button
                        onClick={() => navigate("create")}
                        className="bg-MentivPurple hover:bg-MentivPurple/90"
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
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-MentivPurple/20 to-MentivPurple/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-MentivPurple" />
                      </div>
                      <span className="max-w-md truncate">{course.courseTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900 dark:text-white">
                    {course?.coursePrice ? `₹${course.coursePrice.toLocaleString()}` : "Free"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        course.isPublished
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "bg-amber-500 hover:bg-amber-600 text-white"
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
                      className="hover:bg-MentivPurple hover:text-white transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
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

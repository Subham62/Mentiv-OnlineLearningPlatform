import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Star,
  Play,
  Layers,
  Route,
  ExternalLink,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTotalCoursesQuery } from "@/features/api/courseApi";
import { useGetTotalStudentsQuery } from "@/features/api/authApi";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const { data: totalCourses, isLoading: coursesLoading } = useGetTotalCoursesQuery();
  const NoOfCourses = totalCourses?.totalPublishedCourses ?? "";

  const { data: studentsData, isLoading: studentsLoading } =
    useGetTotalStudentsQuery();
  // const NoOfUsers = usersData;
  // console.log(studentsData.totalStudentsCount);
  const NoOfStudents = studentsData?.totalStudentsCount;

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };

  const scrollToCourses = () => {
    const coursesSection = document.getElementById("courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToPopularSkills = () => {
    const popularSection = document.getElementById("popular-skills");
    if (popularSection) {
      popularSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBecomeInstructor = () => {
    navigate("/become-instructor");
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-700 bg-[#F3EEFF] dark:bg-gray-900">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#5A4BDA]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#5A4BDA]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28 relative">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* LEFT SIDE - Content */}
            <div className="space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-[#5A4BDA] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Learn with a growing community
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                  Find the best courses{" "}
                  <span className="text-[#5A4BDA]">for you</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  Discover, learn, and upskill with curated courses taught by
                  industry experts.
                </p>
              </div>

              {/* SEARCH BAR */}
              <form
                onSubmit={searchHandler}
                className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-2xl border border-gray-200 dark:border-gray-700 hover:border-[#5A4BDA] dark:hover:border-[#5A4BDA] transition-all duration-300"
              >
                <Search className="ml-6 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for anything — web dev, DSA, design..."
                  className="flex-grow border-none focus-visible:ring-0 px-4 py-6 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-base"
                />
                <Button
                  type="submit"
                  className="bg-[#5A4BDA] dark:bg-[#5A4BDA] text-white px-8 py-6 rounded-r-full hover:bg-[#4a3bc0] dark:hover:bg-[#4a3bc0] font-semibold transition-colors"
                >
                  Search
                </Button>
              </form>

              {/* CTA BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-[#5A4BDA] dark:hover:border-[#5A4BDA] hover:bg-[#5A4BDA]/5 dark:hover:bg-[#5A4BDA]/10 text-gray-700 dark:text-gray-300 font-semibold px-6"
                  onClick={scrollToCourses}
                >
                  <BookOpen className="mr-2 w-5 h-5" />
                  Browse all courses
                </Button>

                <Button
                  size="lg"
                  className="rounded-full bg-[#5A4BDA] hover:bg-[#4a3bc0] text-white font-semibold px-6"
                  onClick={scrollToPopularSkills}
                >
                  View popular courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#5A4BDA]" />
                  {studentsLoading || !NoOfStudents ? (
                    <span className="font-semibold text-gray-400 dark:text-gray-500">
                      ...
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {NoOfStudents}+
                    </span>
                  )}{" "}
                  students
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#5A4BDA]" />
                  {coursesLoading || !NoOfCourses ? (
                    <span className="font-semibold text-gray-400 dark:text-gray-500">
                      ...
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {NoOfCourses}+
                    </span>
                  )}{" "}
                  courses
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#5A4BDA]" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Lifetime
                  </span>{" "}
                  access
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Hero Slider with Quick Actions */}
            <div className="space-y-6">
              {/* Main Hero Slider - Full Width */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <HeroSlider />
              </div>

              {/* Quick Action Cards Below Slider */}
              <div className="grid grid-cols-2 gap-4">
                {/* Explore Courses */}
                <button
                  onClick={() => navigate("/course/search?query")}
                  className="group bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#5A4BDA] dark:hover:border-[#5A4BDA] shadow-md hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#5A4BDA]/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#5A4BDA]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                        Explore and Search Courses
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#5A4BDA] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Browse {NoOfCourses!==""? NoOfCourses+"+" : " "} courses
                  </p>
                </button>

                {/* Top Rated */}
                <button
                  onClick={() =>
                    window.open(
                      "https://roadmap.sh/",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="group bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#5A4BDA] dark:hover:border-[#5A4BDA] shadow-md hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Route className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                        Developer Roadmaps
                      </h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        Powered by roadmap.sh (external)
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#5A4BDA]" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Industry-standard learning paths
                  </p>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    High Quality
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Carefully curated courses
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    50+
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Hours
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Hands-On
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Real projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor CTA Banner - Only if not instructor */}
      {user?.role !== "instructor" && (
        <section className="bg-gradient-to-r from-[#5A4BDA] to-[#4a3bc0] border-b border-[#4a3bc0] dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-base">Become an Instructor</p>
                  <p className="text-sm text-white/90">
                    Share knowledge & earn money. Join 500+ instructors
                  </p>
                </div>
              </div>
              <Button
                onClick={handleBecomeInstructor}
                size="lg"
                className="bg-white hover:bg-gray-100 text-[#5A4BDA] font-bold rounded-full px-8 flex-shrink-0"
              >
                Start Teaching
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;

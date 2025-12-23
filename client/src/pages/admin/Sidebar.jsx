import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block w-[260px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 sticky top-0 h-screen">
        <div className="p-6 space-y-6">
          <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Instructor Panel</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage your courses</p>
          </div>

          <nav className="space-y-2">
            <Link
              to="dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive("dashboard")
                  ? "bg-MentivPurple text-white shadow-lg shadow-MentivPurple/30"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <ChartNoAxesColumn size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="course"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive("course")
                  ? "bg-MentivPurple text-white shadow-lg shadow-MentivPurple/30"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <SquareLibrary size={20} />
              <span>Courses</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
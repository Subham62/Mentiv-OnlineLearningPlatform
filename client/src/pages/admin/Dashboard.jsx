// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
// import React from "react";
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const Dashboard = () => {
//   const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError)
//     return <h1 className="text-red-500">Failed to get purchased courses</h1>;

//   const { purchasedCourse } = data || [];

//   const courseData = purchasedCourse.map((course) => ({
//     name: course?.courseId.courseTitle,
//     price: course?.courseId.coursePrice,
//   }));

//   const totalRevenue = purchasedCourse.reduce(
//     (acc, element) => acc + (element.amount || 0),
//     0
//   );
//   const totalSales = purchasedCourse.length;

//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 ">
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Sales</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Revenue</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
//         </CardContent>
//       </Card>

//       {/* Course Prices Card */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-gray-700">
//             Course Prices
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={courseData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//               <XAxis
//                 dataKey="name"
//                 stroke="#6b7280"
//                 angle={-30} // Rotated labels for better visibility
//                 textAnchor="end"
//                 interval={0} // Display all labels
//               />
//               <YAxis stroke="#6b7280" />
//               <Tooltip formatter={(value, name) => [`${value}`, name]} />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="#4a90e2" // change color to a different shadow
//                 strokeWidth={3}
//                 dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

import {
  TrendingUp,
  DollarSign,
  BarChart3,
  BookOpen,
  Users,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetPurchasedCoursesQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-12 max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-destructive/10 rounded-2xl flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-destructive animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Failed to load dashboard
          </h2>
          <p className="text-muted-foreground mb-8">
            Unable to fetch purchased courses data
          </p>
          <Button className="bg-MentivPurple hover:bg-MentivPurple/90">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { purchasedCourse = [] } = data || {};

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + Number(element.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;
  const avgRevenue = totalSales ? (totalRevenue / totalSales).toFixed(0) : 0;
  const uniqueCourses = [
    ...new Set(purchasedCourse.map((c) => c.courseId?._id)),
  ].length;

  const courseData = purchasedCourse.map((course) => ({
    name: course?.courseId?.courseTitle?.slice(0, 15) || "Unknown",
    price: Number(course?.courseId?.coursePrice || 0),
    amount: Number(course.amount || 0),
  }));

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your course sales and revenue
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-MentivPurple/10 dark:bg-MentivPurple/20">
                <TrendingUp className="h-5 w-5 text-MentivPurple" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Sales
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalSales}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Revenue
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-500/10 dark:bg-amber-500/20">
                <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Avg Order
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{avgRevenue}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-sky-500/10 dark:bg-sky-500/20">
                <BookOpen className="h-5 w-5 text-sky-600 dark:text-sky-500" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Unique Courses
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {uniqueCourses}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Course Revenue Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={courseData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  className="text-gray-600 dark:text-gray-400"
                  angle={-30} // Rotated labels for better visibility
                  textAnchor="end"
                  interval={0} // Display all labels
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value, name) => [`${value}`, name]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#5A4BDA"    // change color to a different shadow
                  strokeWidth={3}
                  name="List Price"
                  dot={{ fill: "#5A4BDA", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Revenue"
                  dot={{ fill: "#10b981", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Purchases */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-MentivPurple" />
              Recent Purchases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {purchasedCourse.slice(0, 5).map((purchase, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 hover:from-MentivPurple/5 hover:to-MentivPurple/10 dark:hover:from-MentivPurple/10 dark:hover:to-MentivPurple/20 transition-all duration-200"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                    {purchase.courseId?.courseTitle || "Course"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {purchase.userId?.email?.split("@")[0] || "User"}
                  </p>
                </div>
                <p className="font-bold text-MentivPurple dark:text-gray-300 text-lg whitespace-nowrap">
                  ₹{(purchase.amount || 0).toLocaleString()}
                </p>
              </div>
            ))}
            {purchasedCourse.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-sm">No purchases yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

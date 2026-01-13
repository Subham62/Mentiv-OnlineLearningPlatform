// import React, { useState } from "react";
// import SearchResult from "./SearchResult";
// import Filter from "./Filter";
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle } from "lucide-react";
// import { Link, useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useGetSearchCourseQuery } from "@/features/api/courseApi";

// const SearchPage = () => {

//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("query");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortByPrice, setSortByPrice] = useState("");

//   const {data, isLoading} = useGetSearchCourseQuery({
//     searchQuery: query,
//     categories: selectedCategories,
//     sortByPrice
//   });
//   const isEmpty = !isLoading && data?.courses.length === 0;

//   const handleFilterChange = (categories, prices) => {
//       setSelectedCategories(categories);
//       setSortByPrice(prices);
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-8">
//       <div className="my-6">
//         <h1 className="font-bold text-xl md:text-2xl">result for "{query}"</h1>
//         <p>
//           Showing results for{" "}
//           <span className="text-blue-800 font-bold italic">
//             {query}
//           </span>
//         </p>
//       </div>
//       <div className="flex flex-col md:flex-row gap-10">
//         <Filter handleFilterChange={handleFilterChange}/>
//         <div className="flex-1">
//           {isLoading ? (
//             // showing a skeleton
//             Array.from({ length: 3 }).map((_, idx) => (
//               <CourseSkeleton key={idx} />
//             ))
//           ) : isEmpty ? (
//             <CourseNotFound />
//           ) : (
//             data?.courses.map((course) => <SearchResult key={course._id} course={course}/>)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// const CourseSkeleton = () => {
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//       <Skeleton className="w-full h-36" />

//       <div className="px-5 py-4 space-y-3">
//         <Skeleton className="h-6 w-3/4 " />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-6 w-6 rounded-full" />
//             <Skeleton className="h-4 w-20" />
//           </div>
//           <Skeleton className="h-4 w-16" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//       </div>
//     </div>
//   );
// };

// const CourseNotFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-10">
//       <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
//       <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
//         Course Not Found
//       </h1>
//       <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
//         Sorry, we couldn't find the course you're looking for.
//       </p>
//       <Link to="/">
//         <Button variant="link" className="italic underline ">
//           Browse All Courses
//         </Button>
//       </Link>
//     </div>
//   );
// };

// -----------------------------------------------

import React, { useState } from "react";
import SearchResult from "./SearchResult";
import Filter from "./Filter";
import SearchBar from "@/pages/student/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, SlidersHorizontal, X, TrendingUp, Info } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;
  const resultCount = data?.courses?.length || 0;

  const handleFilterChange = (categories, prices) => {
    setSelectedCategories(categories);
    setSortByPrice(prices);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortByPrice("");
  };

  const handleClearSearch = () => {
    // Remove query from URL but stay on search page to show all courses
    navigate("/course/search", { replace: true });
  };

  const hasActiveFilters = selectedCategories.length > 0 || sortByPrice !== "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Bar Section */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <SearchBar initialQuery={query} onClear={handleClearSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Info Alert - Show when no search query */}
        {!query && (
          <Alert className="mb-6 border-violet-200 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-800">
            <Info className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <AlertDescription className="text-violet-800 dark:text-violet-300">
              <strong>Tip:</strong> Clear the search bar to browse all courses. Use filters below to narrow down your results.
            </AlertDescription>
          </Alert>
        )}

        {/* Search Header with Results Count */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-violet-600" />
                <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
                  {query ? `Results for "${query}"` : "All Courses"}
                </h1>
              </div>
              {!isLoading && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {resultCount > 0 ? (
                    <>
                      {query ? "Found" : "Showing"}{" "}
                      <span className="font-semibold text-violet-600 dark:text-violet-400">
                        {resultCount.toLocaleString()}
                      </span>{" "}
                      {resultCount === 1 ? "course" : "courses"}
                      {hasActiveFilters && " with your filters"}
                    </>
                  ) : (
                    "No courses match your criteria"
                  )}
                </p>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-violet-600">
                  {selectedCategories.length + (sortByPrice ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active filters:
                </span>
                {selectedCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="gap-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 cursor-pointer hover:bg-violet-200 dark:hover:bg-violet-800"
                  >
                    {cat}
                    <X
                      className="h-3 w-3"
                      onClick={() =>
                        handleFilterChange(
                          selectedCategories.filter((c) => c !== cat),
                          sortByPrice
                        )
                      }
                    />
                  </Badge>
                ))}
                {sortByPrice && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 cursor-pointer hover:bg-violet-200 dark:hover:bg-violet-800"
                  >
                    Price: {sortByPrice === "low" ? "Low to High" : "High to Low"}
                    <X
                      className="h-3 w-3"
                      onClick={() => handleFilterChange(selectedCategories, "")}
                    />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-violet-600 hover:text-violet-700 dark:text-violet-400"
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden md:block">
            <Filter handleFilterChange={handleFilterChange} />
          </div>

          {/* Mobile Filter Panel */}
          {showMobileFilters && (
            <div className="md:hidden fixed inset-0 bg-black/50 z-50">
              <div className="bg-white dark:bg-gray-800 h-full w-80 max-w-full overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <Filter handleFilterChange={handleFilterChange} />
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <CourseSkeleton key={idx} />
                  ))}
                </div>
              ) : isEmpty ? (
                <CourseNotFound
                  query={query}
                  hasFilters={hasActiveFilters}
                  onClearFilters={clearFilters}
                />
              ) : (
                <div className="space-y-4">
                  {data?.courses.map((course) => (
                    <SearchResult key={course._id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// Skeleton Component
const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
      <Skeleton className="h-32 w-full md:w-56 rounded" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  );
};

// Empty State Component
const CourseNotFound = ({ query, hasFilters, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-4 mb-4">
        <AlertCircle className="text-red-500 dark:text-red-400 h-12 w-12" />
      </div>
      <h2 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-2 text-center">
        No Courses Found
      </h2>
      <p className="text-base text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
        {hasFilters ? (
          <>
            No courses match {query && <>your search for <span className="font-semibold">"{query}"</span></>} with the selected filters. Try adjusting your filters.
          </>
        ) : query ? (
          <>
            We couldn't find any courses for{" "}
            <span className="font-semibold">"{query}"</span>. Try different
            keywords or browse our catalog.
          </>
        ) : (
          <>
            No published courses available at the moment. Check back later!
          </>
        )}
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        {hasFilters && (
          <Button onClick={onClearFilters} variant="outline">
            Clear Filters
          </Button>
        )}
        <Link to="/">
          <Button className="bg-violet-600 hover:bg-violet-700">
            Browse All Courses
          </Button>
        </Link>
      </div>
    </div>
  );
};

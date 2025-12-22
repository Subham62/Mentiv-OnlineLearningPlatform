// import { Badge } from "@/components/ui/badge";
// import React from "react";
// import { Link } from "react-router-dom";

// const SearchResult = ({course}) => {
//   // console.log(course);
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4 ">
//       <Link
//         to={`/course-detail/${course._id}`}
//         className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
//       >
//         <img
//           src={course.courseThumbnail}
//           alt="course-thumbnail"
//           className="h-32 w-full md:w-56 object-cover rounded"
//         />
//         <div className="flex flex-col gap-2">
//           <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
//           <p className="text-sm text-gray-600">{course.subTitle}</p>
//           <p className="text-sm text-gray-700">
//             Instructor: <span className="font-bold">{course.creator?.name}</span>
//           </p>
//           <Badge className="w-fit mt-2 md:mt-0  hover:cursor-default " >{course.courseLevel}</Badge>
//         </div>
//       </Link>
//       <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
//         <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;

import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <div className="flex flex-col md:flex-row gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-4 rounded-lg transition-all group">
        {/* Course Image */}
        <div className="relative flex-shrink-0">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="h-32 w-full md:w-56 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
          />
          <Badge className="absolute top-2 right-2 bg-violet-600 hover:bg-violet-700">
            {course.courseLevel}
          </Badge>
        </div>

        {/* Course Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h2 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 mb-2">
              {course.courseTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {course.subTitle}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="font-medium">{course.creator?.name}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center md:items-start">
          <div className="text-right">
            <p className="font-bold text-2xl text-violet-600 dark:text-violet-400">
              ₹{course.coursePrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;

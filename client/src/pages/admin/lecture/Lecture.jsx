import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  }
  
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA]/90 dark:bg-[#1F1F1F]/90 px-3 sm:px-4 py-3 rounded-lg my-2 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100/50 dark:border-gray-800/50">
      <h1 className="font-bold text-gray-800 dark:text-gray-100 text-sm truncate flex-1 mr-2">
        Lecture - {index+1} : {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={goToUpdateLecture}
        size={18}
        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-MentivPurple dark:hover:text-MentivPurple/90 transition-colors duration-200 flex-shrink-0 ml-2"
      />
    </div>
  );
};

export default Lecture;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_API = "http://localhost:8000/api/v1/course";
const COURSE_API = "https://mentiv-backend.onrender.com/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    editCourse: builder.mutation({
      query: ({formData, courseId}) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET"
      })
    }),
    createLecture: builder.mutation({
      query: ({lectureTitle, courseId}) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body:{lectureTitle}
      })
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET"
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({courseId, lectureId, lectureTitle, videoInfo, isPreviewFree}) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body:{lectureTitle, videoInfo, isPreviewFree}
      })
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET"
      }),
    }),
    publishCourse: builder.mutation({
      query: ({courseId, query}) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH"
      }),
    }),
    getSearchCourse: builder.query({
      query: ({searchQuery, categories, sortByPrice}) => {
        // Build query string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

        // Append category
        if(categories && categories.length>0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        } 

        // Append sortByPrice is available
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        }
      },
    }),
    getTotalCourses: builder.query({
     query: () => ({
       url:"/totalCourses",
      method: "GET",
     })
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetSearchCourseQuery,
  useGetTotalCoursesQuery,
} = courseApi;

// ✅ Explanation of Tags

// providesTags: Use on queries to declare what cache tag they belong to.

// invalidatesTags: Use on mutations to say which cache tag should be refetched.
// Note: Both are complementry to each other means one store the data and other one fetch that data 

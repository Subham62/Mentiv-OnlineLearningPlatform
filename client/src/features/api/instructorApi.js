import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const INSTRUCTOR_API = "https://mentiv-backend.onrender.com/api/v1/instructor";

export const instructorApi = createApi({
  reducerPath: "instructorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: INSTRUCTOR_API,
    credentials: "include",
  }),
  tagTypes: ["InstructorStatus"],
  endpoints: (builder) => ({
    // Apply to become instructor
    applyToBeInstructor: builder.mutation({
      query: (applicationData) => ({
        url: "/apply",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["InstructorStatus"],
    }),

    // Get instructor status
    getInstructorStatus: builder.query({
      query: () => "/status",
      providesTags: ["InstructorStatus"],
    }),
  }),
});

export const {
  useApplyToBeInstructorMutation,
  useGetInstructorStatusQuery,
} = instructorApi;

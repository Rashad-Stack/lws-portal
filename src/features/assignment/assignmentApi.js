import apiSlice from "../api/apiSlice";
const assignmentApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      // Student portal section
      getAssignmentMark: builder.query({
        query() {
          return {
            url: "/assignmentsMarks",
            method: "GET",
          };
        },
      }),

      getOneAssignmentMark: builder.query({
        query(courseId) {
          return {
            url: `/assignmentsMarks?assignmentId=${courseId}`,
            method: "GET",
          };
        },
        providesTags: ["GetOneAssignment"],
      }),

      postAssignmentMark: builder.mutation({
        query(data) {
          return {
            url: "/assignmentsMarks",
            method: "POST",
            body: {
              ...data,
              status: "pending",
            },
          };
        },
        invalidatesTags: ["GetOneAssignment"],
      }),

      editAssignmentMark: builder.mutation({
        query({ id, data }) {
          return {
            url: `/assignmentsMarks/${id}`,
            method: "PATCH",
            body: {
              mark: data,
              status: "published",
            },
          };
        },

        // Optimistic update
        async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
          const updatePatch = dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMark",
              undefined,
              (draft) => {
                const assignmentMarkToUpdate = draft.assignmentMark.find(
                  (a) => a._id == id
                );
                assignmentMarkToUpdate.status = "published";
                assignmentMarkToUpdate.mark = data;
              }
            )
          );
          try {
            await queryFulfilled;
          } catch (err) {
            updatePatch.undo();
          }
        },
      }),

      getOneAssignment: builder.query({
        query(videoId) {
          return {
            url: `/assignments?videoId=${videoId}`,
            method: "GET",
          };
        },
      }),

      // Admin Portal section
      getAssignment: builder.query({
        query() {
          return {
            url: "/assignments",
            method: "GET",
          };
        },
      }),

      addAssignment: builder.mutation({
        query(data) {
          return {
            url: "/assignments",
            method: "POST",
            body: data,
          };
        },

        // Pessimistic Update
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const { data: createdAssignment } = await queryFulfilled;

            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignment",
                undefined,
                (draft) => {
                  draft?.assignments?.push(createdAssignment.assignment);
                }
              )
            );
          } catch (err) {
            // do nothing
          }
        },
      }),

      editAssignment: builder.mutation({
        query({ id, data }) {
          return {
            url: `/assignments/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
          try {
            const { data: updatedAssignment } = await queryFulfilled;
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignment",
                undefined,
                (draft) => {
                  if (updatedAssignment?.assignment?._id) {
                    const assignmentToUpdate = draft?.assignments?.find(
                      (a) => a._id == id
                    );
                    Object.assign(
                      assignmentToUpdate,
                      updatedAssignment?.assignment
                    );
                  }
                }
              )
            );
          } catch (err) {
            // Do nothing
          }
        },
      }),

      deleteAssignment: builder.mutation({
        query(id) {
          return {
            url: `/assignments/${id}`,
            method: "DELETE",
          };
        },
        // Optimistic delete
        async onQueryStarted(id, { queryFulfilled, dispatch }) {
          const deletePatch = dispatch(
            apiSlice.util.updateQueryData(
              "getAssignment",
              undefined,
              (draft) => {
                const index = draft.assignments.findIndex(
                  (assignment) => assignment._id == id
                );
                if (index != -1) {
                  // Remove the deleted quiz from the array
                  draft.assignments.splice(index, 1);
                }
              }
            )
          );
          try {
            await queryFulfilled;
          } catch (err) {
            // Use optional chaining to undo the delete patch only if it was successfully applied
            deletePatch.undo();
          }
        },
      }),
    };
  },
});

export const {
  useGetAssignmentMarkQuery,
  useGetOneAssignmentMarkQuery,
  usePostAssignmentMarkMutation,
  useGetOneAssignmentQuery,
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
  useEditAssignmentMarkMutation,
} = assignmentApi;

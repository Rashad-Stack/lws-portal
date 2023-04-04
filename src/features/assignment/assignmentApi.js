import apiSlice from "../api/apiSlice";
const assignmentApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      // Student portal section
      getAssignmentMark: builder.query({
        query() {
          return {
            url: "/assignmentMark",
            method: "GET",
          };
        },
      }),

      getOneAssignmentMark: builder.query({
        query({ courseId, studentId }) {
          return {
            url: `/assignmentMark?assignment_id=${courseId}&student_id=${studentId}`,
            method: "GET",
          };
        },
        providesTags: ["GetOneAssignment"],
      }),

      postAssignmentMark: builder.mutation({
        query(data) {
          return {
            url: "/assignmentMark",
            method: "POST",
            body: {
              ...data,
              mark: 0,
              status: "pending",
              createdAt: new Date(Date.now()).toISOString(),
            },
          };
        },
        invalidatesTags: ["GetOneAssignment"],
      }),

      getOneAssignment: builder.query({
        query(videoId) {
          return {
            url: `/assignments?video_id=${videoId}`,
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
            body: {
              ...data,
              totalMark: data.totalMark * 1,
              video_id: data.video_id * 1,
            },
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
                  draft.push(createdAssignment);
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
            body: {
              ...data,
              totalMark: data.totalMark * 1,
              video_id: data.video_id * 1,
            },
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
                  if (updatedAssignment?.id) {
                    const assignmentToUpdate = draft.find((a) => a.id == id);
                    Object.assign(assignmentToUpdate, updatedAssignment);
                  }
                }
              )
            );
          } catch (err) {
            // Do nothing
          }
        },
      }),

      editAssignmentMark: builder.mutation({
        query({ id, data }) {
          return {
            url: `/assignmentMark/${id}`,
            method: "PATCH",
            body: {
              mark: data * 1,
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
                const assignmentMarkToUpdate = draft.find((a) => a.id == id);
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

      deleteAssignment: builder.mutation({
        query(id) {
          return {
            url: `/assignments/${id}`,
            method: "DELETE",
          };
        },
        // Optimistic delete
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          const deletePatch = dispatch(
            apiSlice.util.updateQueryData(
              "getAssignment",
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (assignment) => assignment.id == arg
                );
                if (index != -1) {
                  // Remove the deleted quiz from the array
                  draft.splice(index, 1);
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

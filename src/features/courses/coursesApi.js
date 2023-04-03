import apiSlice from "../api/apiSlice";

const coursesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      // Student portal section
      getCourses: builder.query({
        query() {
          return {
            url: "/videos",
            method: "GET",
          };
        },
      }),

      getVideo: builder.query({
        query(id) {
          return {
            url: `/videos/${id}`,
            method: "GET",
          };
        },
      }),

      // Admin Portal section
      addVideo: builder.mutation({
        query(data) {
          return {
            url: "videos",
            method: "POST",
            body: {
              ...data,
              createdAt: new Date(Date.now()).toISOString(),
            },
          };
        },

        // Pessimistic Update
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const { data: createdVideo } = await queryFulfilled;

            dispatch(
              apiSlice.util.updateQueryData(
                "getCourses",
                undefined,
                (draft) => {
                  draft.push(createdVideo);
                }
              )
            );
          } catch (err) {
            // do nothing
          }
        },
      }),

      editVideo: builder.mutation({
        query({ id, data }) {
          return {
            url: `/videos/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
          try {
            const { data: updatedVideo } = await queryFulfilled;
            dispatch(
              apiSlice.util.updateQueryData(
                "getCourses",
                undefined,
                (draft) => {
                  if (updatedVideo?.id) {
                    const videoToUpdate = draft.find((t) => t.id == id);
                    videoToUpdate.title = updatedVideo.title;
                    videoToUpdate.description = updatedVideo.description;
                    videoToUpdate.url = updatedVideo.url;
                    videoToUpdate.views = updatedVideo.views;
                    videoToUpdate.duration = updatedVideo.duration;
                  }
                }
              )
            );
          } catch (err) {
            // Do nothing
          }
        },
      }),

      deleteVideo: builder.mutation({
        query(id) {
          return {
            url: `/videos/${id}`,
            method: "DELETE",
          };
        },

        // Optimistic delete
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          const deletePatch = dispatch(
            apiSlice.util.updateQueryData("getCourses", undefined, (draft) => {
              const index = draft.findIndex((video) => video.id == arg);
              if (index != -1) {
                draft.splice(index, 1);
              }
            })
          );
          try {
            await queryFulfilled;
          } catch (err) {
            deletePatch.undo();
          }
        },
      }),
    };
  },
});

export const {
  useGetCoursesQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = coursesApi;

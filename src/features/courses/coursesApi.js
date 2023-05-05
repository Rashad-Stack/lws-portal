import apiSlice from "../api/apiSlice";
import { setCourseId } from "./courseSlice";

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
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const { data: result } = await queryFulfilled;
            if (result?.videos.length > 0) {
              dispatch(setCourseId(result?.videos[0]._id));
            }
          } catch (err) {
            // Do nothing
          }
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
            url: "/videos",
            method: "POST",
            body: data,
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
                  draft.videos.push(createdVideo.video);
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
                  if (updatedVideo?.video?._id) {
                    const videoToUpdate = draft.videos.find((t) => t._id == id);

                    Object.assign(videoToUpdate, updatedVideo?.video);
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
              const index = draft.videos.findIndex((video) => video._id == arg);
              if (index != -1) {
                draft.videos.splice(index, 1);
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

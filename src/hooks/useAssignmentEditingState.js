export default function useAssignmentEditingState(tableData = {}) {
  const { title, video_id, video_title, totalMark } = tableData;

  return {
    initialTitle: title,
    initialVideoId: video_id,
    initialVideoTitle: video_title,
    initialTotalMark: totalMark,
  };
}

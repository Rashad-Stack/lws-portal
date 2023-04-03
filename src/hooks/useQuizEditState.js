export default function useQuizEditState(tableData = {}) {
  const { question, video_id, video_title, options } = tableData;

  const result = {
    initialQuestion: question,
    initialVideoId: video_id,
    initialVideoTitle: video_title,
  };

  options?.forEach((option, index) => {
    result[`initialOption${index + 1}`] = option?.option;
    result[`initialOption${index + 1}IsCorrect`] = option?.isCorrect;
  });

  return result;
}

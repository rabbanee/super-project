import Quiz from "./Quiz";

interface Exam {
  maxDuration: number,
  totalQuestions: number,
  currentDuration: number,
  quizzes: Array<Quiz>,
}

export default Exam;
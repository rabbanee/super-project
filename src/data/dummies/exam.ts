import Exam from "@interface/Exam";
import dummyQuizzes from "./quizzes";

const dummyExam: Exam = {
  maxDuration: 60,
  totalQuestions: 4,
  currentDuration: 60,
  quizzes: dummyQuizzes,
};

export default dummyExam;
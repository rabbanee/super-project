import dummyExam from "@data/dummies/exam";
import { User } from "@interface/User";
import Exam from "@modules/exams/room/Exam";
import ExamDescription from "@modules/exams/room/ExamDescription";
import { useEffect, useState } from "react";

interface ExamRoomForStudentProps {
  id: string,
  user: User,
}

const ExamRoomForStudent = ({ id, user }: ExamRoomForStudentProps) => {
  const [isStudentOnATest, setIsStudentOnATest] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [examDuration, setExamDuration] = useState(dummyExam.currentDuration);
  
  useEffect(() => {
    console.log(answers);
    
  }, [answers]);

  if (!isStudentOnATest) {
    return (
      <ExamDescription user={user} examDescription={{ id }} setIsStudentOnATest={setIsStudentOnATest}/>
    );
  }
  
  return <Exam exam={dummyExam} answers={answers} setAnswers={setAnswers} examDuration={examDuration} />;
};

export default ExamRoomForStudent;
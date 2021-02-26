import dummyExam from "@data/dummies/exam";
import { User } from "@interface/User";
import Exam from "@modules/exams/room/Exam";
import ExamDescription from "@modules/exams/room/ExamDescription";
import convertMinutesToMilliseconds from "@utils/convertMinutesToMilliseconds";
import { useEffect, useRef, useState } from "react";

interface ExamRoomForStudentProps {
  id: string,
  user: User,
}

const ExamRoomForStudent = ({ id, user }: ExamRoomForStudentProps) => {
  const [isStudentOnATest, setIsStudentOnATest] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [examDuration, setExamDuration] = useState(Date.now() + convertMinutesToMilliseconds(dummyExam.currentDuration));
  const [isExamPaused, setIsExamPaused] = useState(false);
  const [step, setStep] = useState(1);
  const countdownRef = useRef();

  useEffect(() => {
    console.log(answers);
    
  }, [answers]);

  useEffect(() => {
    if (!isExamPaused) {
      countdownRef?.current?.start();
    }
  }, [isExamPaused]);

  const onExamStarted = ({ total, minutes }) => {
    // console.log(minutes);
    
  };

  const onExamPaused = () => {
    setIsExamPaused(true);
    countdownRef.current.pause();
  }

  // Renderer callback with condition
  const renderer = ({ total, hours, minutes, seconds, completed }) => {
    let firstMinute = dummyExam.currentDuration;
    
    if (firstMinute - minutes === step && seconds === 0) {
      setStep(step + 1);
    }
    console.log(step);
    

    return <>{hours}:{minutes}:{seconds}</>;

    // if (completed) {
    //   // Render a completed state
    //   // return <Completionist />;
    // } else {
    //   // Render a countdown
    //   return <span>{hours}:{minutes}:{seconds}</span>;
    // }
  };

  if (!isStudentOnATest) {
    return (
      <ExamDescription user={user} examDescription={{ id }} setIsStudentOnATest={setIsStudentOnATest}/>
    );
  }
  
  return <Exam onExamPaused={onExamPaused} renderer={renderer} countdownRef={countdownRef}  exam={dummyExam} answers={answers} setAnswers={setAnswers} examDuration={examDuration} onExamStarted={onExamStarted} isExamPaused={isExamPaused} setIsExamPaused={setIsExamPaused} />;
};

export default ExamRoomForStudent;
import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import { useRouter } from 'next/router';
import ExamDescription from '@templates/exams/room/ExamDescription';
import { useEffect, useRef, useState } from 'react';
import Exam from '@templates/exams/room/Exam';
import dummyExam from '@data/dummies/exam';
import convertMinutesToMilliseconds from '@utils/convertMinutesToMilliseconds';

interface ExamRoomProps {
  user: User,
}

const ExamRoom = ({ user }: ExamRoomProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [isStudentOnATest, setIsStudentOnATest] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(dummyExam.quizzes[0]);
  const [selectedOptionKey, setSelectedOptionKey] = useState('');
  const [examDuration, setExamDuration] = useState(dummyExam.currentDuration);
  let intervalRef: any = useRef();
  
  useEffect(() => {
    console.log(answers);
    
    // startTime();  
  }, [answers]);

  // const startTime = () => {
  //   intervalRef.current = setInterval(() => {
  //     setExamDuration((examDuration) =>  convertMinutesToMilliseconds(examDuration) - 1000);
  //   }, 1000);

  //   return () => clearInterval(intervalRef.current);
  // }


  
  // useEffect(() => {
  //   const findAnswerByQuizId = answers.find((answer) => currentQuiz.id === answer.quizId);
  //   if (findAnswerByQuizId) setSelectedOptionKey(`${Object.keys(findAnswerByQuizId.answer)[0]}-${findAnswerByQuizId.quizId}`);
  // }, [currentQuiz]);

  if (!isStudentOnATest) {
    return (
      <ExamDescription user={user} examDescription={{ id, }} setIsStudentOnATest={setIsStudentOnATest}/>
    );
  }

  return <Exam exam={dummyExam} answers={answers} setAnswers={setAnswers} currentQuiz={currentQuiz} setCurrentQuiz={setCurrentQuiz} selectedOptionKey={selectedOptionKey} setSelectedOptionKey={setSelectedOptionKey} examDuration={examDuration} setExamDuration={setExamDuration} />;

};

export default ExamRoom;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [4],
  });

  return {
    props: {
      user, 
    }
  };
});

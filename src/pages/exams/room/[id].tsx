import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import { useRouter } from 'next/router';
import ExamDescription from '@templates/exams/room/ExamDescription';
import { useEffect, useState } from 'react';
import Exam from '@templates/exams/room/Exam';
import dummyExam from '@data/dummies/exam';

interface ExamRoomProps {
  user: User,
}

const ExamRoom = ({ user }: ExamRoomProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [isStudentOnATest, setIsStudentOnATest] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);


  if (!isStudentOnATest) {
    return (
      <ExamDescription user={user} examDescription={{ id, }} setIsStudentOnATest={setIsStudentOnATest}/>
    );
  }

  return <Exam exam={dummyExam} answers={answers} setAnswers={setAnswers} />;

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

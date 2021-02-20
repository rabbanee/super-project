import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import { useRouter } from 'next/router';
import ExamDescription from '@templates/exams/room/ExamDescription';
import { useState } from 'react';
import Quiz from '@templates/exams/room/Quiz';

interface ExamRoomProps {
  user: User,
}

const ExamRoom = ({ user }: ExamRoomProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [isStudentOnATest, setIsStudentOnATest] = useState(false);

  if (!isStudentOnATest) {
    return (
      <ExamDescription user={user} examDescription={{ id, }} setIsStudentOnATest={setIsStudentOnATest}/>
    );
  }

  return <Quiz />;

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

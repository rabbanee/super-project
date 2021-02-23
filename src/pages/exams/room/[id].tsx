import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import { useRouter } from 'next/router';
import { isStudent } from '@utils/roles/isStudent';
import ExamRoomForStudent from '@templates/exams/room/ExamRoomForStudent';
import ExamRoomForTeacher from '@templates/exams/room/ExamRoomForTeacher';
import { isTeacher } from '@utils/roles/isTeacher';

interface ExamRoomProps {
  user: User,
}

const ExamRoom = ({ user }: ExamRoomProps) => {
  const router = useRouter();
  const { id } = router.query;
  
  if (isStudent(user.role)) {
    return (
      <ExamRoomForStudent  user={user} id={`${id}`}/>
    );
  } else if (isTeacher(user.role)) {
    return (
      <ExamRoomForTeacher user={user} />
    );
  } else {
    return '';
  }

};

export default ExamRoom;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [3,4],
  });

  return {
    props: {
      user, 
    }
  };
});

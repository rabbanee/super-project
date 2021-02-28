import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { useRouter } from 'next/router';
import findPermissionByName from '@utils/findPermissionByName';
import CRUDExamRoom from '@templates/exams/room/CRUDExamRoom';
import Index from '@templates/exams/room/Index';
import Error from 'next/error';

interface ExamRoomProps {
  user: User,
  permissions: any,
}

const ExamRoom = ({ user, permissions }: ExamRoomProps) => {
  const router = useRouter();
  const { id } = router.query;
  
  if (findPermissionByName(permissions, 'exam')) {
    return (
      <Index user={user} id={`${id}`} permissions={permissions}/>
    );
  } else if (findPermissionByName(permissions, 'crud exam')) {
    return (
      <CRUDExamRoom user={user} permissions={permissions} />
    );
  } else {
    return <Error statusCode={404} />;
  }

};

export default ExamRoom;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  return {
    props: {
      user, 
      permissions,
    }
  };
});

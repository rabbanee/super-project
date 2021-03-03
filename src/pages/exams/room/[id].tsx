import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { useRouter } from 'next/router';
import findPermissionByName from '@utils/findPermissionByName';
import CRUDExamRoom from '@templates/exams/room/CRUDExamRoom';
import Index from '@templates/exams/room/Index';
import Error from 'next/error';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
interface ExamRoomProps {
  user: User,
  permissions: any,
}

const ExamRoom = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const router = useRouter();
  const { id } = router.query;
  
  if (findPermissionByName(permissions.list, 'exam')) {
    return (
      <Index user={user} id={`${id}`} permissions={permissions.list}/>
    );
  } else if (findPermissionByName(permissions.list, 'crud exam')) {
    return (
      <CRUDExamRoom user={user} permissions={permissions.list} />
    );
  } else {
    return <Error statusCode={404} />;
  }

};

export default WithAuth(ExamRoom);
// export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
//   return {
//     props: {
//       user, 
//       permissions,
//     }
//   };
// });

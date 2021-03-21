import { User } from "@interface/User";
import ExamCRUD from "@templates/exams/ExamCRUD";
import ExamForStudent from "@templates/exams/Exam";
import findPermissionByName from "@utils/findPermissionByName";
import Error from 'next/error'
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
interface ExamsProps {
  user: User,
  permissions: any,
}

const Exams = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  if (findPermissionByName(permissions.list, 'crud exam')) {
    return (
      <ExamCRUD user={user} permissions={permissions.list} />
    );
  } else if (findPermissionByName(permissions.list, 'exam')) {
    return (
      <ExamForStudent user={user}  permissions={permissions.list}/>
    );
  } else {
    return (
      <Error statusCode={404} />
    );
  }
};

export default WithAuth(Exams);
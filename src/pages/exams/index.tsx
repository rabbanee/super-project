import { User } from "@interface/User";
import { withAuthServerSideProps } from "@lib/withAuthServerSide";
import ExamCRUD from "@templates/exams/ExamCRUD";
import ExamForStudent from "@templates/exams/Exam";
import findPermissionByName from "@utils/findPermissionByName";
import { thisPageFor } from "@utils/thisPageFor";
import Error from 'next/error'

interface ExamsProps {
  user: User,
  permissions: any,
}

const Exams = ({ user, permissions }: ExamsProps) => {
  if (findPermissionByName(permissions, 'crud exam')) {
    return (
      <ExamCRUD user={user} permissions={permissions} />
    );
  } else if (findPermissionByName(permissions, 'exam')) {
    return (
      <ExamForStudent user={user}  permissions={permissions}/>
    );
  } else {
    return (
      <Error statusCode={404} />
    );
  }
};

export default Exams;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {

  return {
    props: {
      user, 
      permissions,
    }
  };
});
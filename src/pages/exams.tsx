import { User } from "@interface/User";
import { withAuthServerSideProps } from "@lib/withAuthServerSide";
import ExamForTeacher from "@templates/exams/ExamForTeacher";
import ExamForStudent from "@templates/exams/ExamForStudent";
import { thisPageFor } from "@utils/thisPageFor";
import Error from 'next/error'

interface ExamsProps {
  user: User,
}

const Exams = ({ user }: ExamsProps) => {
  if (user.role === 3) {
    return (
      <ExamForTeacher user={user} />
    );
  } else if (user.role === 4) {
    return (
      <ExamForStudent user={user} />
    );
  } else {
    return (
      <Error statusCode={404}/>
    )
  }
};

export default Exams;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [3, 4],
  });

  return {
    props: {
      user, 
    }
  };
});
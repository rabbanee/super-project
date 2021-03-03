import learningMaterials from '@data/learning-materials';
import { User } from '@interface/User';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';
import { useRouter } from 'next/router';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';

interface UpdateLearningMaterialsProps {
  user: User,
  permissions: any,
}

function UpdateLearningMaterials() {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const router = useRouter();
  const { id } = router.query;
  return(
    <AddOrUpdateLearningMaterials permissions={permissions.list} title="Ubah Materi Pembelajaran" user={user} learningMaterial={learningMaterials.find((learningMaterial) => learningMaterial.id === Number(id))}/>
  );
};

export default WithAuth(UpdateLearningMaterials);
// export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
//   return {
//     props: {
//       user, 
//       permissions,
//     }
//   };
// });
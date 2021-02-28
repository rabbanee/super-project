import learningMaterials from '@data/learning-materials';
import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';
import { useRouter } from 'next/router';

interface UpdateLearningMaterialsProps {
  user: User,
  permissions: any,
}

function UpdateLearningMaterials({ user, permissions }: UpdateLearningMaterialsProps) {
  const router = useRouter();
  const { id } = router.query;
  return(
    <AddOrUpdateLearningMaterials permissions={permissions} title="Ubah Materi Pembelajaran" user={user} learningMaterial={learningMaterials.find((learningMaterial) => learningMaterial.id === Number(id))}/>
  );
};

export default UpdateLearningMaterials;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  return {
    props: {
      user, 
      permissions,
    }
  };
});
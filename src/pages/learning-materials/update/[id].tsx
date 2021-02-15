import learningMaterials from '@data/learning-materials';
import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';
import { useRouter } from 'next/router';

interface UpdateLearningMaterialsProps {
  user: User
}

function UpdateLearningMaterials({ user }: UpdateLearningMaterialsProps) {
  const router = useRouter();
  const { id } = router.query;
  return(
    <AddOrUpdateLearningMaterials title="Ubah Materi Pembelajaran" user={user} learningMaterial={learningMaterials.find((learningMaterial) => learningMaterial.id === Number(id))}/>
  );
};

export default UpdateLearningMaterials;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
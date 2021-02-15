import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';

interface AddLearningMaterialsProps {
  user: User
}

function AddLearningMaterials({ user }: AddLearningMaterialsProps) {   
  return(
    <AddOrUpdateLearningMaterials title="Tambah Materi Pembelajaran" user={user}/>
  );
};

export default AddLearningMaterials;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
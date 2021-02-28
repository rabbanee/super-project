import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';

interface AddLearningMaterialsProps {
  user: User,
  permissions: any
}

function AddLearningMaterials({ user, permissions }: AddLearningMaterialsProps) {   
  return(
    <AddOrUpdateLearningMaterials title="Tambah Materi Pembelajaran" user={user} permissions={permissions}/>
  );
};

export default AddLearningMaterials;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  return {
    props: {
      user, 
      permissions,
    }
  };
});
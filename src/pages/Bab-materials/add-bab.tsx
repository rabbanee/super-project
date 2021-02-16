import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrUpdateBabMaterials from 'components/templates/Bab-materials/AddOrUpdate';

interface AddBabMaterialsProps {
  user: User
}

function AddBabMaterials({ user }: AddBabMaterialsProps) {   
  return(
    <AddOrUpdateBabMaterials title="Tambah Materi Pembelajaran" user={user}/>
  );
};

export default AddBabMaterials;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
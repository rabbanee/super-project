import { User } from '@interface/User';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';

interface AddLearningMaterialsProps {
  user: User,
  permissions: any
}

function AddLearningMaterials() {   
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  return(
    <AddOrUpdateLearningMaterials title="Tambah Materi Pembelajaran" user={user} permissions={permissions.list}/>
  );
};

export default WithAuth(AddLearningMaterials, 'crud learning materials');
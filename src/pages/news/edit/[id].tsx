import { User } from '@interface/User';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import WithAuth from '@lib/WithAuth';
import { useSelector } from 'react-redux';

interface EditNewsProps {
  user: User,
  permissions: any,
}

const EditNews = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  return (
    <AddOrEditNews user={user} news={['manusia']} permissions={permissions.list} />
  );
};

export default WithAuth(EditNews, 'crud news');
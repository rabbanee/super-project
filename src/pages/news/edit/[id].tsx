import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import usePermissions from '@lib/usePermissions';

interface EditNewsProps {
  user: User,
  permissions: any,
}

const EditNews = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const checkPermissions = usePermissions({
    permissionName: 'crud news',
  });
  return (
    <AddOrEditNews user={user} news={['manusia']} permissions={permissions.list} />
  );
};

export default WithAuth(EditNews);
// export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
//   checkPermissions({
//     context,
//     permissions,
//     permissionName: 'crud news',
//   });

//   return {
//     props: {
//       user, 
//       permissions,
//     }
//   };
// });
import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import React from 'react';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import usePermissions from '@lib/usePermissions';

interface AddNewsProps {
  user: User,
  permissions: any,
}

const AddNews = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const checkPermissions = usePermissions({
    permissionName: 'crud news',
  });
  return (
    <AddOrEditNews user={user} permissions={permissions.list}/>
  );
};

export default WithAuth(AddNews);
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
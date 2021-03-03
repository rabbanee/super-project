import { User } from '@interface/User';
import React, { useEffect, useState } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrEditAnnouncement from '@templates/announcement/AddOrEditAnnouncement';
import { useDispatch, useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
import usePermissions from '@lib/usePermissions';

interface EditAnnoncementProps {
  user: User,
  permissions: any,
}


const EditAnnoncement = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const checkPermissions = usePermissions({
    permissionName: 'crud announcement',
  });
  return (
    <AddOrEditAnnouncement user={user} announcement={['manusia']} permissions={permissions.list} />
  );
};

export default WithAuth(EditAnnoncement);
// export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
//   checkPermissions({
//     context,
//     permissions,
//     permissionName: 'crud announcement',
//   });

//   return {
//     props: {
//       user, 
//     }
//   };
// });
import { User } from '@interface/User';
import React, { useEffect, useState } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrEditAnnouncement from '@templates/announcement/AddOrEditAnnouncement';
import checkPermissions from '@utils/checkPermissions';

interface EditAnnoncementProps {
  user: User,
  permissions: any,
}


const EditAnnoncement = ({ user, permissions }: EditAnnoncementProps) => {
  return (
    <AddOrEditAnnouncement user={user} announcement={['manusia']} permissions={permissions} />
  );
};

export default EditAnnoncement;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  checkPermissions({
    context,
    permissions,
    permissionName: 'crud announcement',
  });

  return {
    props: {
      user, 
    }
  };
});
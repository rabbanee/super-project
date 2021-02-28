import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import checkPermissions from '@utils/checkPermissions';
import { thisPageFor } from '@utils/thisPageFor';
import React from 'react';

interface EditNewsProps {
  user: User,
  permissions: any,
}

const EditNews = ({ user, permissions }: EditNewsProps) => {
  return (
    <AddOrEditNews user={user} news={['manusia']} permissions={permissions} />
  );
};

export default EditNews;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  checkPermissions({
    context,
    permissions,
    permissionName: 'crud news',
  });

  return {
    props: {
      user, 
      permissions,
    }
  };
});
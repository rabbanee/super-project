import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import React from 'react';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import checkPermissions from '@utils/checkPermissions';

interface AddNewsProps {
  user: User,
  permissions: any,
}

const AddNews = ({ user, permissions }: AddNewsProps) => {
  return (
    <AddOrEditNews user={user} permissions={permissions}/>
  );
};

export default AddNews;
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
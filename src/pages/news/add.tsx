import { User } from '@interface/User';
import React from 'react';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import WithAuth from '@lib/WithAuth';
import { useSelector } from 'react-redux';

interface AddNewsProps {
  user: User,
  permissions: any,
}

const AddNews = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  return (
    <AddOrEditNews user={user} permissions={permissions.list}/>
  );
};

export default WithAuth(AddNews, 'crud news');
import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import React from 'react';
import AddOrEditNews from '@templates/news/AddOrEditNews';

interface AddNewsProps {
  user: User,
}

const AddNews = ({ user }: AddNewsProps) => {
  return (
    <AddOrEditNews user={user}/>
  );
};

export default AddNews;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [1],
  });

  return {
    props: {
      user, 
    }
  };
});
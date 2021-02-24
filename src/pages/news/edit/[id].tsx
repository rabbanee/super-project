import { User } from '@interface/User';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import AddOrEditNews from '@templates/news/AddOrEditNews';
import { thisPageFor } from '@utils/thisPageFor';
import React from 'react';

interface EditNewsProps {
  user: User,
}

const EditNews = ({ user }: EditNewsProps) => {
  return (
    <AddOrEditNews user={user} news={['manusia']}/>
  );
};

export default EditNews;
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
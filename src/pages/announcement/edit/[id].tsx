import { User } from '@interface/User';
import React, { useEffect, useState } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import AddOrEditAnnouncement from '@templates/announcement/AddOrEditAnnouncement';

interface EditAnnoncementProps {
  user: User,
}


const EditAnnoncement = ({ user }: EditAnnoncementProps) => {
  return (
    <AddOrEditAnnouncement user={user} announcement={['manusia']} />
  );
};

export default EditAnnoncement;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [
      1,2,3
    ],
  });

  return {
    props: {
      user, 
    }
  };
});
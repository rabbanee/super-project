import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Title from '@elements/Title';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import ContainerFooter from '@elements/container/Footer';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import AddOrEditAnnouncement from '@templates/announcement/AddOrEditAnnouncement';

interface AddAnnoncementProps {
  user: User,
}


const AddAnnoncement = ({ user }: AddAnnoncementProps) => {
  return (
    <AddOrEditAnnouncement user={user} />
  );
};

export default AddAnnoncement;
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